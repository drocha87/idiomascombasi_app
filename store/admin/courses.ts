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

  courseNameById(state) {
    return (id: string): string => {
      const lesson = state.courses.find((course: Course) => course.id === id)
      return lesson?.title || 'undefined'
    }
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
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCourses({ commit }) {
    try {
      const cs = await this.$adminapi.$get('courses/')
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
    const course = await this.$adminapi.$get(`courses/${id}`)
    commit('SET_CURRENT_COURSE', course)
  },

  async save({ commit }, course: Partial<Course>) {
    try {
      const { course_id: cid } = await this.$adminapi.$post('courses/', course)
      this.$router.push({ path: `/admin/courses/${cid}` })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async updateHeader({ state, dispatch }) {
    const date = state.currentCourse.expires_at
      ? new Date(state.currentCourse.expires_at)
      : undefined
    await this.$adminapi.$patch(`courses/${state.currentCourse.id}/header`, {
      title: state.currentCourse.title,
      short_description: state.currentCourse.short_description,
      image: state.currentCourse.image,
      expires_at: date,
    })
    await dispatch('fetchCourse', state.currentCourse.id)
  },

  async removeCourse({ commit, state }) {
    if (
      confirm(
        `Are you sure you want to delete the course ${state.currentCourse.title}`
      )
    ) {
      await this.$adminapi.$delete(`courses/${state.currentCourse.id}`)
      commit('SET_CURRENT_COURSE', {})
      this.$router.push({ path: '/admin/courses' })
    }
  },

  async addModule({ state, dispatch }, moduleId: string) {
    await this.$adminapi.$put(
      `courses/${state.currentCourse.id}/module/${moduleId}`
    )
    await dispatch('fetchCourse', state.currentCourse.id)
  },

  async removeModule({ state, dispatch }, moduleId: string) {
    // TODO: confirm before remove
    await this.$adminapi.$delete(
      `courses/${state.currentCourse.id}/module/${moduleId}`
    )
    await dispatch('fetchCourse', state.currentCourse.id)
  },

  async toggleModuleRelease({ state, commit, dispatch }, moduleId: string) {
    try {
      await this.$adminapi.$post(
        `courses/${state.currentCourse.id}/module/${moduleId}/togglerelease`
      )
      await dispatch('fetchCourse', state.currentCourse.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async moveModule(
    { state, dispatch },
    { direction, id }: { direction: string; id: string }
  ) {
    await this.$adminapi.$patch(
      `courses/${state.currentCourse.id}/module/${id}/${direction}`
    )
    await dispatch('fetchCourse', state.currentCourse.id)
  },

  async updateBody({ state }) {
    await this.$adminapi.$patch(`courses/${state.currentCourse.id}/body`, {
      description: state.currentCourse.description,
      wywl: state.currentCourse.wywl,
      requiriments: state.currentCourse.requiriments,
    })
  },

  async release({ state, dispatch }) {
    await this.$adminapi.$post(`courses/${state.currentCourse.id}/release`)
    await dispatch('fetchCourse', state.currentCourse.id)
  },

  async unrelease({ state, dispatch }) {
    await this.$adminapi.$delete(`courses/${state.currentCourse.id}/release`)
    await dispatch('fetchCourse', state.currentCourse.id)
  },
}
