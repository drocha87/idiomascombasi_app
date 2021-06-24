import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Role } from '@/types'

export const state = () => {
  const roles: Role[] = []

  return {
    roles,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  roles(state): Role[] {
    return state.roles
  },
}

export const mutations: MutationTree<RootState> = {
  SET_ROLES(state, roles: Role[]): void {
    state.roles = roles
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchRoles({ commit }) {
    try {
      const { roles } = await this.$axios.$get('/admin/roles/')
      commit('SET_ROLES', roles)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
