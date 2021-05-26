import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User } from '@/types'

export const state = () => {
  const student: Partial<User> = {}
  return {
    student,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  student(state): Partial<User> {
    return state.student
  },
}

export const mutations: MutationTree<RootState> = {
  SET_STUDENT(state, student: any): void {
    state.student = Object.assign(state.student, student)
  },

  SET_NAME(state, name: string): void {
    state.student.name = name
  },

  SET_BIO(state, bio: string): void {
    state.student.bio = bio
  },
}

export const actions: ActionTree<RootState, RootState> = {
  fetchStudent({ commit }) {
    // const course = await this.$axios.$get('/auth/student')
    commit('SET_STUDENT', this.$auth.user)
  },

  async updateInfo({ commit, state }) {
    try {
      await this.$studentapi.$patch('/info', {
        name: state.student.name,
        bio: state.student.bio,
      })
      await this.$auth.fetchUser()
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
