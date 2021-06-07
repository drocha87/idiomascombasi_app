<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Modules</h1>

    <ButtonNuxtLink
      class="mt-4 block w-36 ml-auto"
      label="Create Module"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ modules.length }} modules found
    </div>

    <ContainerSlot title="Modules">
      <div class="flex items-end mb-8">
        <Input
          v-model="filterModule"
          class="w-1/3"
          label="Search by matching word"
          placeholder="Search course"
        />
        <SelectLanguage
          v-model="filterLang"
          class="ml-8 w-36"
          label="Filter by language"
        />
      </div>

      <InfoModule
        v-for="mod in modules"
        :key="mod.id"
        class="mb-2"
        :mod="mod"
      />
      <!-- <div v-if="modules.length" class="w-full mt-8">
        <nuxt-link
          v-for="(mod, index) in modules"
          :key="mod.id"
          class="block py-2 px-4 w-full hover:bg-gray-200"
          :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-gray-50': index % 2 !== 0,
          }"
          :to="mod.id"
          append
        >
          <div class="flex imtes-center justify-between">
            <div>
              <span class="text-sm">{{ mod.title }}</span>
            </div>
            <div class="capitalize text-xs p-2 bg-green-100 px-4 select-none">
              {{ mod.language }}
            </div>
          </div>
        </nuxt-link>
      </div> -->
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Module } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      filterModule: '',
      filterLang: '',
    }
  },

  async fetch() {
    try {
      await this.$store.dispatch('admin/modules/fetchModules')
    } catch (error) {
      alert(
        `Error: ${
          error.message || error.data?.message || error.data?.response?.message
        }`
      )
    }
  },

  computed: {
    modules(): Module[] {
      const modules: Module[] = this.$store.getters['admin/modules/modules']
      return modules
        .filter(
          (q: Module) =>
            this.filterLang === '' || this.filterLang === q.language
        )
        .filter((q: Module) => {
          const regex = new RegExp(this.filterModule, 'gi')
          return this.filterModule === '' || regex.test(q.title)
        })
    },
  },
})
</script>
