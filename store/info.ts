import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { AxiosError } from 'axios'

export const state = () => {
  const error: Error | AxiosError = new Error('nothing')
  return {
    error,
    type: '',
    message: '',
    hasInfo: false,
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getType(state): string {
    return state.type
  },

  getError(state): Error {
    return state.error
  },

  getMessage(state): string {
    return state.message
  },

  hasInfo(state): boolean {
    return state.hasInfo
  },
}

export const mutations: MutationTree<RootState> = {
  SET_INFO(state, message: string): void {
    state.message = message
    state.type = 'info'
    state.hasInfo = true
  },

  SET_WARNING(state, message: string): void {
    state.message = message
    state.type = 'warning'
    state.hasInfo = true
  },

  SET_ERROR(state, error: any): void {
    state.message =
      error.response.data.message || error.response.data || error.message
    state.error = error
    state.type = 'error'
    state.hasInfo = true
  },

  CLEAN_INFO(state): void {
    state.hasInfo = false
  },
}

export const actions: ActionTree<RootState, RootState> = {}
