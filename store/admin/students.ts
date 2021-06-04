import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User, UserContactInfo, UserPersonalInfo } from '@/types'

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

  SET_STUDENT_ADDRESS(state, address: string): void {
    state.student.address = address
  },

  SET_STUDENT_PHONE(state, phone: string): void {
    state.student.phone = phone
  },

  SET_STUDENT_NAME(state, name: string): void {
    state.student.name = name
  },

  SET_STUDENT_BIRTHDAY(state, birthday: string): void {
    state.student.birthday = new Date(birthday)
  },

  SET_STUDENT_BIO(state, bio: string): void {
    state.student.bio = bio
  },

  SET_STUDENT_AVATAR(state, avatar: string): void {
    state.student.avatar = avatar
  },

  SET_STUDENT_NICKNAME(state, nickname: string): void {
    state.student.nickname = nickname
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

  async insert({ commit }, email: string) {
    try {
      const { user_id: id } = await this.$adminapi.$post(`/users/`, { email })
      this.$router.push({ path: `/admin/students/${id}` })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async updateContactInfo({ state, commit, dispatch }) {
    try {
      const info: Partial<UserContactInfo> = state.student
      await this.$adminapi.$patch(`/users/${state.student.id}/contact`, info)
      await dispatch('fetchStudent', state.student.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async updatePersonalInfo({ state, commit, dispatch }) {
    try {
      const info: Partial<UserPersonalInfo> = state.student
      await this.$adminapi.$patch(`/users/${state.student.id}/personal`, info)
      await dispatch('fetchStudent', state.student.id)
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

  async appendLanguage({ state, commit, dispatch }, language: string) {
    try {
      await this.$adminapi.$put(`/users/${state.student.id}/languages`, {
        language: language.toLowerCase(),
      })
      await dispatch('fetchStudent', state.student.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async changeLanguageLevel(
    { state, commit, dispatch },
    { level, language }: { level: number; language: any }
  ) {
    try {
      await this.$adminapi.$patch(`/users/${state.student.id}/languages`, {
        id: language.id,
        level,
      })
      await dispatch('fetchStudent', state.student.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
