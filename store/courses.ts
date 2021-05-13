import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  courses: [] as any[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  courses(state): any[] {
    return state.courses
  },
}

export const mutations: MutationTree<RootState> = {
  SET_COURSES(state, courses: any[]): void {
    state.courses = courses
  },
}

export const actions: ActionTree<RootState, RootState> = {
  fetchCourse(_, _id: string): any {
    return {
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
    }
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
