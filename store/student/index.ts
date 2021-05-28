import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User, Course, Module, Lesson } from '@/types'

export const state = () => {
  const student: Partial<User> = {}

  const course: Partial<Course> = {}
  const module: Partial<Module> = {}
  const lesson: Partial<Lesson> = {}

  return {
    student,
    course,
    module,
    lesson,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  student(state) {
    return state.student
  },

  course(state) {
    return state.course
  },

  module(state) {
    return state.module
  },

  lesson(state) {
    return state.lesson
  },
}

export const mutations: MutationTree<RootState> = {
  SET_STUDENT(state, student: any): void {
    state.student = Object.assign(state.student, student)
  },

  SET_LESSON(state, lesson: Partial<Lesson>) {
    state.lesson = lesson
  },

  SET_COURSE(state, course: Partial<Course>) {
    state.course = course
  },

  SET_MODULE(state, module: Partial<Module>) {
    state.module = module
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

  async fetchLesson(
    { commit },
    { course_id, lesson_id }: { course_id: string; lesson_id: string }
  ) {
    try {
      const { lesson, module, course } = await this.$studentapi.$get(
        `/course/${course_id}/lesson/${lesson_id}`
      )
      commit('SET_COURSE', course)
      commit('SET_MODULE', module)
      commit('SET_LESSON', lesson)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
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
