<template>
  <div class="border p-4 mt-8">
    <TitleSmall>Modules</TitleSmall>
    <div class="p-4">
      <div
        v-for="(mod, index) in mods"
        :key="mod"
        type="button"
        class="text-sm block"
      >
        <div
          class="flex p-2"
          :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-gray-200': index % 2 !== 0,
          }"
        >
          <button
            type="button"
            class="focus:outline-none bg-white rounded-full"
            @click="moveModule('up', mod)"
          >
            <IconExpandLess></IconExpandLess>
          </button>
          <button
            type="button"
            class="focus:outline-none bg-white rounded-full ml-2"
            @click="moveModule('down', mod)"
          >
            <IconExpandMore></IconExpandMore>
          </button>
          <div class="ml-6 flex-grow">
            {{ moduleName(mod) }}
          </div>
          <button
            type="button"
            class="text-xs text-red-500 px-4"
            @click="$store.dispatch('admin/courses/removeModule', mod)"
          >
            Remove
          </button>
          <nuxt-link
            type="button"
            class="text-xs text-green-800 px-4"
            :to="`/admin/modules/${mod}`"
          >
            Visit
          </nuxt-link>
        </div>
      </div>

      <div v-if="mods.length === 0" class="text-sm text-center text-gray-600">
        This course actually don't have any modules, you should start adding
        modules to this course.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, Module } from '@/types'

export default Vue.extend({
  computed: {
    allMods(): Module[] {
      return this.$store.getters['admin/modules/modules']
    },

    course(): Course {
      return this.$store.getters['admin/courses/currentCourse']
    },

    mods(): string[] {
      if (this.course.modules) {
        return this.course.modules
      }
      return []
    },

    availableMods(): Module[] {
      const courseMods = this.course.modules
      return this.allMods.filter((l: Module) => {
        let display = true
        if (courseMods?.includes(l.id!)) {
          display = false
        }
        return l.language === this.course.language && display
      })
    },
  },

  methods: {
    moduleName(id: string): string {
      const mod = this.allMods.find((lesson: any) => {
        return lesson.id === id
      })
      if (mod) {
        return mod.title
      }
      return 'undefined'
    },

    async moveModule(direction: string, id: string) {
      await this.$store.dispatch('admin/courses/moveModule', { direction, id })
    },
  },
})
</script>
