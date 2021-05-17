import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  course: {},
  courses: [] as any[],
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

  SET_COURSES(state, courses: any[]): void {
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

  fetchCourses({ commit }) {
    // TODO: fetch from backend
    // const things = this.$axios.$get('/things')
    const courses = [
      {
        id: '123456',
        image: '',
        title: 'Español con Basi',
        created_at: '01/04/2021',
        level: 'Iniciante',
        language: 'Espanhol',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste debitis maiores totam mollitia aliquam? Quaerat autem distinctio reiciendis dicta sit dolor voluptates voluptatum excepturi.',
        kind: 'Online ao vivo',
        platform: 'ZOOM',
        start_at: '20/05/2021',
        expire_at: '20/05/2021',
      },
    ]
    commit('SET_COURSES', courses)
  },
}
