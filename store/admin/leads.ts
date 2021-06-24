import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Lead } from '@/types'

export const state = () => {
  const lead: Partial<Lead> = {}

  return {
    lead,
    leads: [] as Lead[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  leads(state): Lead[] {
    return state.leads
  },

  lead(state): Partial<Lead> {
    return state.lead
  },
}

export const mutations: MutationTree<RootState> = {
  SET_LEAD(state, lead: Partial<Lead>): void {
    state.lead = lead
  },

  SET_LEADS(state, leads: Lead[]): void {
    state.leads = leads
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchLeads({ commit }) {
    try {
      const questions = await this.$axios.$get('/admin/leads/')
      commit('SET_LEADS', questions)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
