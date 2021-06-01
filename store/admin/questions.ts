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

  SET_QUESTION_LEVEL(state, level: number): void {
    state.question.level = level
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchQuestions({ commit }) {
    try {
      const questions = await this.$adminapi.$get('questions/')
      commit('SET_QUESTIONS', questions)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchQuestion({ commit }, id: string) {
    try {
      const question = await this.$adminapi.$get(`questions/${id}`)
      commit('SET_QUESTION', question)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async save({ commit }, question: Partial<Question>) {
    try {
      const { question_id: id } = await this.$adminapi.$post(
        'questions/',
        question
      )
      this.$router.push({ path: `/admin/questions/${id}` })
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
        await this.$adminapi.$delete(`questions/${state.question.id}`)
        commit('SET_QUESTION', {})
        this.$router.push({ path: '/admin/questions' })
      }
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async appendAnswer({ commit, state, dispatch }, answer: any): Promise<void> {
    try {
      await this.$adminapi.$put(`questions/${state.question.id}/answer`, answer)
      await dispatch('fetchQuestion', state.question.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  // async updateHeader({ commit, state }) {
  //   try {
  //     await this.$adminapi.$patch(`lessons/${state.currentLesson.id}/header`, {
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
  //     await this.$adminapi.$put(
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
  //     await this.$adminapi.$delete(
  //       `lessons/${state.currentLesson.id}/resource/${resourceID}`
  //     )
  //     await dispatch('fetchLesson', state.currentLesson.id)
  //   } catch (error) {
  //     commit('info/SET_ERROR', error, { root: true })
  //   }
  // },

  // async updateBody({ state }) {
  //   await this.$adminapi.$patch(`courses/${state.currentLesson.id}/body`, {
  //     description: state.currentLesson.description,
  //     wywl: state.currentLesson.wywl,
  //     requiriments: state.currentLesson.requiriments,
  //   })
  // },
}