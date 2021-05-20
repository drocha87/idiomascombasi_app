import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Course } from '@/types'

export const state = () => {
  const currentCourse: Partial<Course> = {}

  return {
    currentCourse,
    courses: [] as Course[],
    modules: [] as any[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  courses(state): Course[] {
    return state.courses
  },

  currentCourse(state): any {
    return state.currentCourse
  },

  modules(state): any[] {
    return state.modules
  },
}

export const mutations: MutationTree<RootState> = {
  SET_CURRENT_COURSE(state, course: Course): void {
    state.currentCourse = course
    if (course.modules_info) {
      state.modules = course.modules_info.map((mod: any) => {
        return Object.assign({}, mod, { toggleVisibility: false })
      })
    }
  },

  SET_COURSES(state, courses: Course[]): void {
    state.courses = courses
  },

  SET_COURSE_TITLE(state, title: string): void {
    state.currentCourse.title = title
  },

  SET_COURSE_IMAGE(state, image: string): void {
    state.currentCourse.image = image
  },

  SET_COURSE_DESCRIPTION(state, description: string): void {
    state.currentCourse.description = description
  },

  SET_COURSE_SHORT_DESCRIPTION(state, short_description: string): void {
    state.currentCourse.short_description = short_description
  },

  SET_COURSE_WYWL(state, wywl: string): void {
    state.currentCourse.wywl = wywl
  },

  SET_COURSE_REQUIRIMENTS(state, requiriments: string): void {
    state.currentCourse.requiriments = requiriments
  },

  SET_COURSE_EXPIRESAT(state, expires_at: string): void {
    state.currentCourse.expires_at = expires_at
  },

  SET_COURSE_VISIBILITY(state, visible: boolean): void {
    state.currentCourse.visible = visible
  },

  TOGGLE_MOD_VISIBILITY(state, index: number) {
    const mod: any = state.modules[index]
    if (mod) {
      mod.toggleVisibility = !mod.toggleVisibility
      state.modules.forEach((item: any) => {
        if (item.id !== mod.id) {
          item.toggleVisibility = false
        }
      })
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCourse({ commit }, id: string) {
    const course = await this.$axios.$get(`courses/${id}`)
    commit('SET_CURRENT_COURSE', course)
  },

  async updateHeader({ state }) {
    const date = state.currentCourse.expires_at
      ? new Date(state.currentCourse.expires_at)
      : undefined
    await this.$axios.$patch(`courses/${state.currentCourse.id}/header`, {
      title: state.currentCourse.title,
      short_description: state.currentCourse.short_description,
      image: state.currentCourse.image,
      expires_at: date,
    })
  },

  async updateBody({ state }) {
    await this.$axios.$patch(`courses/${state.currentCourse.id}/body`, {
      description: state.currentCourse.description,
      wywl: state.currentCourse.wywl,
      requiriments: state.currentCourse.requiriments,
    })
  },

  async release({ state, dispatch }) {
    await this.$axios.$post(`courses/${state.currentCourse.id}/release`)
    await dispatch('fetchCourse', state.currentCourse.id)
  },

  async unrelease({ state, dispatch }) {
    await this.$axios.$delete(`courses/${state.currentCourse.id}/release`)
    await dispatch('fetchCourse', state.currentCourse.id)
  },

  async fetchCourses({ commit }) {
    const cs = await this.$axios.$get('courses/')
    commit('SET_COURSES', cs)
  },
}
