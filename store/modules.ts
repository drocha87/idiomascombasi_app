import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface Module {
  id: string
  title: string
  description: string
}

export const state = () => {
  const currentModule: Partial<Module> = {}

  return {
    currentModule,
    modules: [] as any[],
  }
}

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  modules(state): any[] {
    return state.modules
  },

  currentModule(state): any {
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
  async fetchModule({ commit }, id: string) {
    const mod = await this.$axios.$get(`modules/${id}`)
    commit('SET_CURRENT_MODULE', mod)
  },

  async removeModule({ commit, state }) {
    if (
      confirm(
        `Are you sure you want to delete the module ${state.currentModule.title}`
      )
    ) {
      await this.$axios.$delete(`modules/${state.currentModule.id}`)
      commit('SET_CURRENT_MODULE', {})
      this.$router.push({ path: '/admin/modules' })
    }
  },

  async updateHeader({ state }) {
    await this.$axios.$patch(`modules/${state.currentModule.id}/header`, {
      title: state.currentModule.title,
      description: state.currentModule.description,
    })
  },

  async fetchModules({ commit }) {
    const modules = await this.$axios.$get('modules/')
    commit('SET_MODULES', modules)
  },
}
