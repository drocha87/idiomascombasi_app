import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Course } from '@/types'

export const state = () => ({
  course: {},
  courses: [] as Partial<Course>[],
  modules: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  courses(state): any[] {
    return state.courses
  },

  modules(state): any[] {
    return state.modules
  },

  course(state): any {
    return state.course
  },
}

export const mutations: MutationTree<RootState> = {
  SET_COURSE(state, course: any): void {
    state.course = course
    state.modules = course.modules_info.map((mod: any) => {
      return Object.assign({}, mod, { toggleVisibility: false })
    })
  },

  SET_COURSES(state, courses: Course[]): void {
    state.courses = courses
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
    const course = await this.$axios.$get(`views/course/${id}`)
    commit('SET_COURSE', course)
  },

  async fetchCourses({ commit }) {
    const cs = await this.$axios.$get('courses/')
    commit('SET_COURSES', cs)
  },
}
