import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Module } from '@/types'

export const state = () => {
  const currentModule: Partial<Module> = {}

  return {
    currentModule,
    modules: [] as Module[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  modules(state): Module[] {
    return state.modules
  },

  currentModule(state): Partial<Module> {
    return state.currentModule
  },
}

export const mutations: MutationTree<RootState> = {
  SET_CURRENT_MODULE(state, module: any): void {
    state.currentModule = module
  },

  SET_MODULES(state, modules: any[]): void {
    state.modules = modules
  },

  SET_MODULE_TITLE(state, title: string): void {
    state.currentModule.title = title
  },

  SET_MODULE_DESCRIPTION(state, description: string): void {
    state.currentModule.description = description
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchModules({ commit }) {
    try {
      const modules = await this.$adminapi.$get('modules/')
      commit('SET_MODULES', modules)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async fetchModule({ commit }, id: string) {
    try {
      const mod = await this.$adminapi.$get(`modules/${id}`)
      commit('SET_CURRENT_MODULE', mod)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async saveModule({ commit }, mod: Partial<Module>) {
    try {
      const { module_id } = await this.$adminapi.$post('modules/', mod)
      this.$router.push({ path: `/admin/modules/${module_id}` })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async toggleLessonRelease({ state, commit, dispatch }, lessonID: string) {
    try {
      await this.$adminapi.$post(
        `modules/${state.currentModule.id}/lesson/${lessonID}/togglerelease`
      )
      await dispatch('fetchModule', state.currentModule.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async removeModule({ commit, state }) {
    if (
      confirm(
        `Are you sure you want to delete the module ${state.currentModule.title}`
      )
    ) {
      await this.$adminapi.$delete(`modules/${state.currentModule.id}`)
      commit('SET_CURRENT_MODULE', {})
      this.$router.push({ path: '/admin/modules' })
    }
  },

  async updateHeader({ state, commit }) {
    try {
      await this.$adminapi.$patch(`modules/${state.currentModule.id}/header`, {
        title: state.currentModule.title,
        description: state.currentModule.description,
      })
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async moveLesson(
    { commit, state, dispatch },
    { direction, id }: { direction: string; id: string }
  ) {
    try {
      await this.$adminapi.$patch(
        `modules/${state.currentModule.id}/lesson/${id}/${direction}`
      )
      await dispatch('fetchModule', state.currentModule.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async addLesson({ commit, state, dispatch }, id: string) {
    try {
      await this.$adminapi.$put(
        `modules/${state.currentModule.id}/lesson/${id}`
      )
      await dispatch('fetchModule', state.currentModule.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },

  async removeLesson({ commit, state, dispatch }, id: string) {
    try {
      await this.$adminapi.$delete(
        `modules/${state.currentModule.id}/lesson/${id}`
      )
      await dispatch('fetchModule', state.currentModule.id)
    } catch (error) {
      commit('info/SET_ERROR', error, { root: true })
    }
  },
}
