<template>
  <div class="p-4 border mt-4">
    <TitleSmall>Available Modules</TitleSmall>
    <p class="mb-4 text-xs text-gray-700">
      To add a module into a course, just click in the Add button in front of
      the module. Remember that you <strong>DON'T</strong> need to save the
      course after add the module, since it will be saved automatically
    </p>
    <div class="p-4">
      <div
        v-for="(mod, index) in availableMods"
        :key="mod.id"
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
          <div class="ml-4 flex-grow">
            {{ mod.title }}
          </div>
          <button
            type="button"
            class="text-xs text-red-500 px-4 font-bold text-blue-900"
            @click="$store.dispatch('admin/courses/addModule', mod.id)"
          >
            Add
          </button>
          <nuxt-link
            type="button"
            class="text-xs text-green-800 px-4"
            :to="`/admin/modules/${mod.id}`"
          >
            Visit
          </nuxt-link>
        </div>
      </div>

      <div
        v-if="availableMods.length === 0"
        class="text-sm text-center text-gray-600"
      >
        You don't have any modules to add to this course,
        <nuxt-link class="underline" to="/admin/modules/new">
          click here
        </nuxt-link>
        and create your first module compatible with this course
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, Module } from '@/types'

export default Vue.extend({
  props: {
    course: { type: Object as () => Course, required: true },
  },

  computed: {
    allMods(): Module[] {
      return this.$store.getters['admin/modules/modules']
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
        return (
          l.language === this.course.language &&
          !courseMods.some((cm: any) => cm.module_id === l.id)
        )
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
button {
  @apply focus:outline-none;
}
</style>
