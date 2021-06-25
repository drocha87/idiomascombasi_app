import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Course, Role } from '@/types'

export const state = () => {
  const course: Partial<Course> = {}

  return {
    course,
    courses: [] as Course[],
    modules: [] as any[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  courses(state): Course[] {
    return state.courses
  },

  course(state): Partial<Course> {
    return state.course
  },

  modules(state): any[] {
    return state.modules
  },

  courseNameById(state) {
    return (id: string): string => {
      const lesson = state.courses.find((course: Course) => course.id === id)
      return lesson?.title || 'undefined'
    }
  },
}

export const mutations: MutationTree<RootState> = {
  SET_COURSE(state, course: Partial<Course>) {
    state.course = Object.assign(state.course, course)
  },

  SET_CURRENT_COURSE(state, course: Course): void {
    state.course = course
  },

  SET_COURSES(state, courses: Course[]): void {
    state.courses = courses
  },

  SET_COURSE_TITLE(state, title: string): void {
    state.course.title = title
  },

  SET_COURSE_LANGUAGE(state, language: string): void {
    state.course.language = language
  },

  SET_COURSE_KIND(state, kind: string): void {
    state.course.kind = kind
  },

  SET_COURSE_ROLE(state, role: Role): void {
    state.course.role = role
  },

  SET_COURSE_IMAGE(state, image: string): void {
    state.course.image = image
  },

  SET_COURSE_DESCRIPTION(state, description: string): void {
    state.course.description = description
  },

  SET_COURSE_SHORT_DESCRIPTION(state, short_description: string): void {
    state.course.short_description = short_description
  },

  SET_COURSE_WYWL(state, wywl: string): void {
    state.course.wywl = wywl
  },

  SET_COURSE_REQUIRIMENTS(state, requiriments: string): void {
    state.course.requiriments = requiriments
  },

  SET_COURSE_EXPIRESAT(state, expires_at: string): void {
    state.course.expires_at = expires_at
  },

  SET_COURSE_VISIBILITY(state, visible: boolean): void {
    state.course.visible = visible
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCourses({ commit }) {
    try {
      const cs = await this.$axios.$get('/admin/courses/')
      commit('SET_COURSES', cs)
    } catch (error) {
      alert(
        `Error: ${
          error.message || error.data?.message || error.data?.response?.message
        }`
      )
    }
  },

  async fetchCourse({ commit }, id: string) {
    const course = await this.$axios.$get(`/admin/courses/${id}`)
    commit('SET_CURRENT_COURSE', course)
  },

  async save({ commit }, course: Partial<Course>) {
    try {
      const { course_id: cid } = await this.$axios.$post(
        '/admin/courses/',
        course
      )
      this.$router.push({ path: `/admin/courses/${cid}` })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async updateHeader({ state, dispatch }) {
    const date = state.course.expires_at
      ? new Date(state.course.expires_at)
      : undefined
    // TODO: improve this code below is too much verbose to be fair
    await this.$axios.$patch(`/admin/courses/${state.course.id}/header`, {
      title: state.course.title,
      language: state.course.language,
      kind: state.course.kind,
      role: state.course.role,
      short_description: state.course.short_description,
      image: state.course.image,
      expires_at: date,
    })
    await dispatch('fetchCourse', state.course.id)
  },

  async removeCourse({ commit, state }) {
    if (
      confirm(
        `Are you sure you want to delete the course ${state.course.title}`
      )
    ) {
      await this.$axios.$delete(`/admin/courses/${state.course.id}`)
      commit('SET_CURRENT_COURSE', {})
      this.$router.push({ path: '/admin/courses' })
    }
  },

  async addModule({ state, dispatch }, moduleId: string) {
    await this.$axios.$put(
      `/admin/courses/${state.course.id}/module/${moduleId}`
    )
    await dispatch('fetchCourse', state.course.id)
  },

  async removeModule({ state, dispatch }, moduleId: string) {
    // TODO: confirm before remove
    await this.$axios.$delete(
      `/admin/courses/${state.course.id}/module/${moduleId}`
    )
    await dispatch('fetchCourse', state.course.id)
  },

  async toggleModuleRelease({ state, commit, dispatch }, moduleId: string) {
    try {
      await this.$axios.$post(
        `/admin/courses/${state.course.id}/module/${moduleId}/togglerelease`
      )
      await dispatch('fetchCourse', state.course.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async moveModule(
    { state, dispatch },
    { direction, id }: { direction: string; id: string }
  ) {
    await this.$axios.$patch(
      `/admin/courses/${state.course.id}/module/${id}/${direction}`
    )
    await dispatch('fetchCourse', state.course.id)
  },

  async updateBody({ state }) {
    await this.$axios.$patch(`/admin/courses/${state.course.id}/body`, {
      description: state.course.description,
      wywl: state.course.wywl,
      requiriments: state.course.requiriments,
    })
  },

  async release({ state, dispatch }) {
    await this.$axios.$post(`/admin/courses/${state.course.id}/release`)
    await dispatch('fetchCourse', state.course.id)
  },

  async unrelease({ state, dispatch }) {
    await this.$axios.$delete(`/admin/courses/${state.course.id}/release`)
    await dispatch('fetchCourse', state.course.id)
  },
}
