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

  lessonNameById(state) {
    return (id: string): string => {
      const lesson = state.lessons.find((lesson: Lesson) => lesson.id === id)
      return lesson?.title || 'undefined'
    }
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
    try {
      const lessons = await this.$adminapi.$get('lessons/')
      commit('SET_LESSONS', lessons)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchLesson({ commit }, id: string) {
    try {
      const lesson = await this.$adminapi.$get(`lessons/${id}`)
      commit('SET_CURRENT_LESSON', lesson)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async save({ commit }, lesson: Lesson) {
    try {
      const { lesson_id: id } = await this.$adminapi.$post('lessons/', lesson)
      this.$router.push({ path: `/admin/lessons/${id}` })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async removeLesson({ commit, state }) {
    try {
      if (
        confirm(
          `Are you sure you want to delete the lesson ${state.currentLesson.title}`
        )
      ) {
        await this.$adminapi.$delete(`lessons/${state.currentLesson.id}`)
        commit('SET_CURRENT_LESSON', {})
        this.$router.push({ path: '/admin/lessons' })
      }
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async updateHeader({ commit, state }) {
    try {
      await this.$adminapi.$patch(`lessons/${state.currentLesson.id}/header`, {
        title: state.currentLesson.title,
        duration: parseInt(`${state.currentLesson.duration}`),
        description: state.currentLesson.description,
      })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async addResource(
    { commit, state, dispatch },
    resource: Resource
  ): Promise<void> {
    try {
      await this.$adminapi.$put(
        `lessons/${state.currentLesson.id}/resource`,
        resource
      )
      await dispatch('fetchLesson', state.currentLesson.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async deleteResource(
    { commit, state, dispatch },
    resourceID: string
  ): Promise<void> {
    try {
      await this.$adminapi.$delete(
        `lessons/${state.currentLesson.id}/resource/${resourceID}`
      )
      await dispatch('fetchLesson', state.currentLesson.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  // async updateBody({ state }) {
  //   await this.$adminapi.$patch(`courses/${state.currentLesson.id}/body`, {
  //     description: state.currentLesson.description,
  //     wywl: state.currentLesson.wywl,
  //     requiriments: state.currentLesson.requiriments,
  //   })
  // },
}
