import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => {
  return {
    resourcesInfo: {},
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  resourcesInfo(state): any {
    return state.resourcesInfo
  },
}

export const mutations: MutationTree<RootState> = {
  SET_RESOURCE_INFO(state, info) {
    state.resourcesInfo = Object.assign({}, state.resourcesInfo, info)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async register(
    { commit },
    { email, resend }: { email: string; resend: boolean }
  ) {
    await this.$axios.$post('/auth/register', { email, resend })
    commit(
      'info/SET_INFO',
      `Email with confirmation code was sent to ${email}`,
      { root: true }
    )
  },

  async fetchResourcesInfo({ commit }) {
    try {
      const info = await this.$axios.$get('/public/resources-info')
      commit('SET_RESOURCE_INFO', info)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
