import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Lesson, Resource } from '@/types'

export const state = () => {
  const currentLesson: Partial<Lesson> = {}

  return {
    currentLesson,
    lessons: [] as Lesson[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  lessons(state): Lesson[] {
    return state.lessons
  },

  currentLesson(state): any {
    return state.currentLesson
  },
}

export const mutations: MutationTree<RootState> = {
  SET_CURRENT_LESSON(state, lesson: Lesson): void {
    state.currentLesson = lesson
  },

  SET_LESSONS(state, lessons: Lesson[]): void {
    state.lessons = lessons
  },

  SET_LESSON_TITLE(state, title: string): void {
    state.currentLesson.title = title
  },

  SET_LESSON_DURATION(state, duration: number): void {
    state.currentLesson.duration = duration
  },

  SET_LESSON_DESCRIPTION(state, description: string): void {
    state.currentLesson.description = description
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchLessons({ commit }) {
    const cs = await this.$axios.$get('lessons/')
    commit('SET_LESSONS', cs)
  },

  async fetchLesson({ commit }, id: string) {
    const lesson = await this.$axios.$get(`lessons/${id}`)
    commit('SET_CURRENT_LESSON', lesson)
  },

  async removeLesson({ commit, state }) {
    if (
      confirm(
        `Are you sure you want to delete the lesson ${state.currentLesson.title}`
      )
    ) {
      await this.$axios.$delete(`lessons/${state.currentLesson.id}`)
      commit('SET_CURRENT_LESSON', {})
      this.$router.push({ path: '/admin/lessons' })
    }
  },

  async updateHeader({ state }) {
    await this.$axios.$patch(`lessons/${state.currentLesson.id}/header`, {
      title: state.currentLesson.title,
      duration: parseInt(`${state.currentLesson.duration}`),
      description: state.currentLesson.description,
    })
  },

  async addResource({ state, dispatch }, resource: Resource): Promise<void> {
    await this.$axios.$put(
      `lessons/${state.currentLesson.id}/resource`,
      resource
    )
    await dispatch('fetchLesson', state.currentLesson.id)
  },

  async deleteResource({ state, dispatch }, resourceID: string): Promise<void> {
    await this.$axios.$delete(
      `lessons/${state.currentLesson.id}/resource/${resourceID}`
    )
    await dispatch('fetchLesson', state.currentLesson.id)
  },

  // async updateBody({ state }) {
  //   await this.$axios.$patch(`courses/${state.currentLesson.id}/body`, {
  //     description: state.currentLesson.description,
  //     wywl: state.currentLesson.wywl,
  //     requiriments: state.currentLesson.requiriments,
  //   })
  // },
}
