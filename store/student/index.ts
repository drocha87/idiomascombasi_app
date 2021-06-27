import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User, Course } from '@/types'

export const state = () => {
  const student: Partial<User> = {}
  const courses: Course[] = []
  const freebies: Course[] = []
  const premiums: Course[] = []

  return {
    student,
    courses,
    freebies,
    premiums,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  student(state) {
    return state.student
  },

  courses(state) {
    return state.courses
  },

  freebies(state) {
    return state.freebies
  },

  premiums(state) {
    return state.premiums
  },

  courseNameById(state) {
    return (id: string): string => {
      const lesson = state.courses.find((course: Course) => course.id === id)
      return lesson?.title || 'undefined'
    }
  },

  freebieNameById(state) {
    return (id: string): string => {
      const lesson = state.freebies.find((course: Course) => course.id === id)
      return lesson?.title || 'undefined'
    }
  },

  premiumNameById(state) {
    return (id: string): string => {
      const lesson = state.premiums.find((course: Course) => course.id === id)
      return lesson?.title || 'undefined'
    }
  },
}

export const mutations: MutationTree<RootState> = {
  SET_FREEBIES(state, freebies: Course[]) {
    state.freebies = freebies
  },

  SET_PREMIUMS(state, premiums: Course[]) {
    state.premiums = premiums
  },

  SET_COURSES(state, courses: Course[]) {
    state.courses = courses
  },

  SET_STUDENT(state, student: any): void {
    state.student = Object.assign(state.student, student)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchStudent({ commit }) {
    try {
      await this.$auth.fetchUser()
      commit('SET_STUDENT', this.$auth.user)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchCourses({ commit }) {
    const cs = await this.$axios.$get('/students/courses')
    commit('SET_COURSES', cs)
  },

  async fetchFreebies({ commit }) {
    const cs = await this.$axios.$get('/students/freebies')
    commit('SET_FREEBIES', cs)
  },

  async fetchPremiums({ commit }) {
    const cs = await this.$axios.$get('/students/premiums')
    commit('SET_PREMIUMS', cs)
  },

  async updateInfo({ commit, state }) {
    try {
      await this.$axios.$patch('/students/info', state.student)
      await this.$auth.fetchUser()
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async updateInterests({ commit }, interests: string[]) {
    try {
      await this.$axios.$patch('/students/interests', interests)
      await this.$auth.fetchUser()
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async addFreebie({ commit, dispatch }, courseID: string) {
    try {
      await this.$axios.$post(`/students/freebies/${courseID}`)
      await dispatch('fetchStudent')
      await dispatch('fetchFreebies')
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
