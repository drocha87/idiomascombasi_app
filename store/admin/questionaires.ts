import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Questionaire } from '@/types'

export const state = () => {
  const questionaire: Partial<Questionaire> = {}

  return {
    questionaire,
    questionaires: [] as Questionaire[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  questionaires(state): Questionaire[] {
    return state.questionaires
  },

  questionaire(state): Partial<Questionaire> {
    return state.questionaire
  },
}

export const mutations: MutationTree<RootState> = {
  SET_QUESTIONAIRE(state, questionaire: Partial<Questionaire>): void {
    state.questionaire = questionaire
  },

  SET_QUESTIONAIRES(state, questionaires: Questionaire[]): void {
    state.questionaires = questionaires
  },

  SET_QUESTIONAIRE_TITLE(state, title: string): void {
    state.questionaire.title = title
  },

  SET_QUESTIONAIRE_DESCRIPTION(state, description: string): void {
    state.questionaire.description = description
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchQuestionaires({ commit }) {
    try {
      const questionaires = await this.$axios.$get('/admin/questionaires/')
      commit('SET_QUESTIONAIRES', questionaires)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchQuestionaire({ commit }, id: string) {
    try {
      const questionaire = await this.$axios.$get(`/admin/questionaires/${id}`)
      commit('SET_QUESTIONAIRE', questionaire)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async save({ commit }, questionaire: Partial<Questionaire>) {
    try {
      const { questionaire_id: id } = await this.$axios.$post(
        '/admin/questionaires/',
        questionaire
      )
      this.$router.push({ path: `/admin/questionaires/${id}` })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async removeQuestionaire({ commit, state }) {
    try {
      if (
        confirm(
          `Are you sure you want to delete the questionaire ${state.questionaire.title}`
        )
      ) {
        await this.$axios.$delete(
          `/admin/questionaires/${state.questionaire.id}`
        )
        commit('SET_QUESTIONAIRE', {})
        this.$router.push({ path: '/admin/questionaires' })
      }
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async appendQuestion({ commit, state, dispatch }, id: any): Promise<void> {
    try {
      await this.$axios.$put(
        `/admin/questionaires/${state.questionaire.id}/question/${id}`
      )
      await dispatch('fetchQuestionaire', state.questionaire.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async removeQuestion({ commit, state, dispatch }, id: any): Promise<void> {
    try {
      await this.$axios.$delete(
        `/admin/questionaires/${state.questionaire.id}/question/${id}`
      )
      await dispatch('fetchQuestionaire', state.questionaire.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async update({ commit, state }) {
    try {
      await this.$axios.$patch(
        `/admin/questionaires/${state.questionaire.id}`,
        {
          title: state.questionaire.title,
          description: state.questionaire.description,
        }
      )
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

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
