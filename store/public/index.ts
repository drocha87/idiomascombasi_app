import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => {
  return {}
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {
  async register(
    { commit },
    { email, resend }: { email: string; resend: boolean }
  ) {
    await this.$axios.$post('/register', { email, resend })
    commit(
      'info/SET_INFO',
      `Email with confirmation code was sent to ${email}`,
      { root: true }
    )
  },
}
