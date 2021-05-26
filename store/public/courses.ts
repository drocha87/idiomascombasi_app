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
  async fetchCourses({ commit }) {
    const cs = await this.$publicapi.$get('courses')
    commit('SET_COURSES', cs)
  },

  async fetchCourse({ commit }, id: string) {
    const course = await this.$publicapi.$get(`course/${id}`)
    commit('SET_CURRENT_COURSE', course)
  },
}
