import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  student: {},
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  student(state): any {
    return state.student
  },
}

export const mutations: MutationTree<RootState> = {
  SET_STUDENT(state, student: any): void {
    state.student = student
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchStudent({ commit }) {
    const course = await this.$axios.$get('/auth/student')
    commit('SET_STUDENT', course)
  },
}
