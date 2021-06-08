<template>
  <Accordion title="Módulos" :items="course.modules">
    <template #title="{ item }">
      <span
        class="ml-4 font-ember font-light flex items-center"
        :class="{
          'text-gray-400': !item.released,
          'text-gray-900': item.released,
        }"
      >
        <IconLock
          v-if="!item.released"
          class="mr-2"
          size="14px"
          fill="#9ca3af"
        />
        {{ findModuleName(item.module_id) }}
      </span>
    </template>
    <template #content="{ item }">
      <div
        v-for="l in findModuleLessons(item.module_id)"
        :key="l.id"
        class="px-4 pt-2 text-sm text-gray-900"
      >
        <div class="flex tracking-wide">
          <div class="flex flex-col flex-grow">
            <nuxt-link
              v-slot="{ navigate }"
              class="flex-grow font-ember"
              :to="`lesson/${l.lesson_id}`"
              append
              custom
            >
              <button
                class="flex items-center"
                :class="{
                  'text-gray-400 cursor-not-allowed': !l.released,
                  'text-gray-900': l.released,
                }"
                :disabled="!l.released"
                @click="navigate"
              >
                <IconLock
                  v-if="!l.released"
                  class="mr-2"
                  size="12px"
                  fill="#9ca3af"
                />
                {{ findLessonName(l.lesson_id) }}
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </template>
  </Accordion>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, Module, Lesson } from '@/types'

export default Vue.extend({
  props: {
    course: { type: Object as () => Course, required: true },
    modules: { type: Array as () => Module[], required: true },
    lessons: { type: Array as () => Lesson[], required: true },
  },

  methods: {
    findModuleLessons(id: string): any[] {
      const mod = this.modules.find((i: any) => i.id === id)
      return mod ? mod.lessons : []
    },

    findModuleName(id: string): string {
      const mod = this.modules.find((i: any) => i.id === id)
      return mod ? mod.title : 'undefined'
    },

    findLessonName(id: string): string {
      const lesson = this.lessons.find((i: any) => i.id === id)
      return lesson ? lesson.title : 'undefined'
    },
  },
})
</script>

<style lang="postcss" scoped>
a:hover #author-name {
  @apply text-black transition duration-700 ease-in-out;
}
</style>
