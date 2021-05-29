import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User } from '@/types'

export const state = () => {
  const student: Partial<User> = {}
  const students: User[] = []
  return {
    students,
    student,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  students(state): User[] {
    return state.students
  },

  student(state): Partial<User> {
    return state.student
  },
}

export const mutations: MutationTree<RootState> = {
  SET_STUDENTS(state, students: User[]): void {
    state.students = students
  },

  SET_STUDENT(state, student: Partial<User>): void {
    state.student = student
  },

  SET_STUDENT_EMAIL(state, email: string): void {
    state.student.email = email
  },

  SET_STUDENT_NAME(state, name: string): void {
    state.student.name = name
  },

  SET_STUDENT_BIO(state, bio: string): void {
    state.student.bio = bio
  },

  SET_STUDENT_AVATR(state, avatar: string): void {
    state.student.avatar = avatar
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchStudents({ commit }) {
    try {
      const students = await this.$adminapi.$get('/users/')
      commit('SET_STUDENTS', students)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchStudent({ commit }, id: string) {
    try {
      const student = await this.$adminapi.$get(`/users/${id}`)
      commit('SET_STUDENT', student)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async appendCourse({ state, commit, dispatch }, id: string) {
    try {
      await this.$adminapi.$post(`/users/${state.student.id}/courses/${id}`)
      await dispatch('fetchStudent', state.student.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async removeCourse({ state, commit, dispatch }, id: string) {
    try {
      await this.$adminapi.$delete(`/users/${state.student.id}/courses/${id}`)
      await dispatch('fetchStudent', state.student.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
