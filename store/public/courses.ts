import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Course, Module, Lesson } from '@/types'

export const state = () => {
  const courses: Course[] = []
  const course: Partial<Course> = {}
  const modules: Module[] = []
  const lessons: Lesson[] = []

  return {
    courses,
    course,
    modules,
    lessons,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  courses(state): Course[] {
    return state.courses
  },

  course(state): any {
    return state.course
  },

  currentCourse(state): any {
    return state.course
  },

  modules(state): Module[] {
    return state.modules
  },

  lessons(state): Lesson[] {
    return state.lessons
  },

  courseNameById(state) {
    return (id: string): string => {
      const lesson = state.courses.find((course: Course) => course.id === id)
      return lesson?.title || 'undefined'
    }
  },
}

export const mutations: MutationTree<RootState> = {
  SET_COURSES(state, courses: Course[]): void {
    state.courses = courses
  },

  SET_COURSE(state, course: Course): void {
    state.course = course
  },

  SET_MODULES(state, modules: Module[]): void {
    state.modules = modules
  },

  SET_LESSONS(state, lessons: Lesson[]): void {
    state.lessons = lessons
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCourses({ commit }) {
    const cs = await this.$axios.$get('/public/courses')
    commit('SET_COURSES', cs)
  },

  async fetchCourse({ commit }, id: string) {
    try {
      const course = await this.$axios.$get(`/public/course/${id}`)
      commit('SET_COURSE', course)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchCourseModules({ commit, state }) {
    try {
      const modules = await this.$axios.$get(
        `/public/course/${state.course.id}/modules`
      )
      commit('SET_MODULES', modules)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchCourseLessons({ commit, state }) {
    try {
      const lessons = await this.$axios.$get(
        `/public/course/${state.course.id}/lessons`
      )
      commit('SET_LESSONS', lessons)
    } catch (error) {
      console.log(error)
    }
  },
}
