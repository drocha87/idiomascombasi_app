<template>
  <ContainerSlot title="Este curso inclui">
    <div class="flex flex-wrap justify-between md:p-4 md:px-12 text-sm">
      <div class="w-full md:w-auto flex md:flex-col items-center">
        <div class="font-ember text-xl w-1/4 md:w-auto">{{ nOfModules }}</div>
        <div class="font-ember uppercase text-gray-600">módulos</div>
      </div>
      <div class="w-full md:w-auto flex md:flex-col items-center">
        <div class="font-ember text-xl w-1/4 md:w-auto">{{ nOfClasses }}</div>
        <div class="font-ember uppercase text-gray-600">aulas</div>
      </div>
      <div class="w-full md:w-auto flex md:flex-col items-center">
        <div class="font-ember text-xl w-1/4 md:w-auto">{{ nOfMinutes }}</div>
        <div class="font-ember uppercase text-gray-600">minutos de aulas</div>
      </div>
    </div>
  </ContainerSlot>
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

  computed: {
    nOfModules(): number {
      return this.modules?.length || 0
    },

    nOfClasses(): number {
      if (this.modules) {
        return this.modules.reduce((acc, val: any) => {
          return acc + val.lessons.length
        }, 0)
      }
      return 0
    },

    nOfMinutes(): number {
      if (this.lessons) {
        return this.lessons.reduce((acc: number, lesson: Lesson) => {
          return acc + lesson.duration
        }, 0)
      }
      return 0
    },
  },
})
</script>
