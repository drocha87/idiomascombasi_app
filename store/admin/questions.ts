import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Question } from '@/types'

export const state = () => {
  const question: Partial<Question> = {}

  return {
    question,
    questions: [] as Question[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  questions(state): Question[] {
    return state.questions
  },

  question(state): Partial<Question> {
    return state.question
  },

  questionTitleById(state) {
    return (id: string): string => {
      const question = state.questions.find((q: Question) => q.id === id)
      return question?.title || 'undefined'
    }
  },
}

export const mutations: MutationTree<RootState> = {
  SET_QUESTION(state, question: Partial<Question>): void {
    state.question = question
  },

  SET_QUESTIONS(state, questions: Question[]): void {
    state.questions = questions
  },

  SET_QUESTION_TITLE(state, title: string): void {
    state.question.title = title
  },

  SET_QUESTION_LEVEL(state, level: string): void {
    state.question.level = parseInt(level)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchQuestions({ commit }) {
    try {
      const questions = await this.$axios.$get('/admin/questions/')
      commit('SET_QUESTIONS', questions)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchQuestion({ commit }, id: string) {
    try {
      const question = await this.$axios.$get(`/admin/questions/${id}`)
      commit('SET_QUESTION', question)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async save({ commit }, question: Partial<Question>) {
    try {
      const { question_id: id } = await this.$axios.$post(
        '/admin/questions/',
        question
      )
      this.$router.push({ path: `/admin/questions/${id}` })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async update({ commit, state }) {
    try {
      await this.$axios.$patch(`/admin/questions/${state.question.id}`, {
        title: state.question.title,
        level: parseInt(`${state.question.level}`),
      })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async removeQuestion({ commit, state }) {
    try {
      if (
        confirm(
          `Are you sure you want to delete the question ${state.question.title}`
        )
      ) {
        await this.$axios.$delete(`/admin/questions/${state.question.id}`)
        commit('SET_QUESTION', {})
        this.$router.push({ path: '/admin/questions' })
      }
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async appendAnswer({ commit, state, dispatch }, answer: any): Promise<void> {
    try {
      await this.$axios.$put(
        `/admin/questions/${state.question.id}/answer`,
        answer
      )
      await dispatch('fetchQuestion', state.question.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async toggleAnswerCorrect(
    { commit, state, dispatch },
    id: string
  ): Promise<void> {
    try {
      await this.$axios.$patch(
        `/admin/questions/${state.question.id}/answer/${id}/toggle-correct`
      )
      await dispatch('fetchQuestion', state.question.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  // async updateHeader({ commit, state }) {
  //   try {
  //     await this.$axios.$patch(`lessons/${state.currentLesson.id}/header`, {
  //       title: state.currentLesson.title,
  //       duration: parseInt(`${state.currentLesson.duration}`),
  //       description: state.currentLesson.description,
  //     })
  //   } catch (error) {
  //     commit('info/SET_ERROR', error, { root: true })
  //   }
  // },

  // async addResource(
  //   { commit, state, dispatch },
  //   resource: Resource
  // ): Promise<void> {
  //   try {
  //     resource.expires_in = parseInt(`${resource.expires_in}`)
  //     await this.$axios.$put(
  //       `lessons/${state.currentLesson.id}/resource`,
  //       resource
  //     )
  //     await dispatch('fetchLesson', state.currentLesson.id)
  //   } catch (error) {
  //     commit('info/SET_ERROR', error, { root: true })
  //   }
  // },

  // async deleteResource(
  //   { commit, state, dispatch },
  //   resourceID: string
  // ): Promise<void> {
  //   try {
  //     await this.$axios.$delete(
  //       `lessons/${state.currentLesson.id}/resource/${resourceID}`
  //     )
  //     await dispatch('fetchLesson', state.currentLesson.id)
  //   } catch (error) {
  //     commit('info/SET_ERROR', error, { root: true })
  //   }
  // },

  // async updateBody({ state }) {
  //   await this.$axios.$patch(`courses/${state.currentLesson.id}/body`, {
  //     description: state.currentLesson.description,
  //     wywl: state.currentLesson.wywl,
  //     requiriments: state.currentLesson.requiriments,
  //   })
  // },
}
