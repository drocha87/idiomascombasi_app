<template>
  <Accordion title="Módulos" :items="modules">
    <template #content="{ item }">
      <div
        v-for="l in item.lessons"
        :key="l.id"
        class="px-4 pt-2 text-sm text-gray-900"
      >
        <div class="flex tracking-wide">
          <div class="flex flex-col flex-grow">
            {{ findName(l.lesson_id) }}
          </div>
        </div>
      </div>
    </template>
  </Accordion>
</template>

<script lang="ts">
import Vue from 'vue'
import { Module, Lesson } from '@/types'

export default Vue.extend({
  props: {
    modules: { type: Array as () => Module[], required: true },
    lessons: { type: Array as () => Lesson[], required: true },
  },

  methods: {
    findName(id: string): string {
      const lesson = this.lessons.find((i: any) => i.id === id)
      return lesson ? lesson.title : 'undefined'
    },
  },
})
</script>
