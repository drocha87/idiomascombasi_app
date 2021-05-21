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
import { Course } from '@/types'

export default Vue.extend({
  props: {
    course: { type: Object as () => Course, required: true },
  },

  computed: {
    nOfModules(): number {
      return this.course.modules?.length || 0
    },

    nOfClasses(): number {
      if (this.course.modules_info) {
        return this.course.modules_info.reduce((acc, val: any) => {
          return acc + val.lessons.length
        }, 0)
      }
      return 0
    },

    nOfMinutes(): number {
      let minutes = 0
      if (this.course.modules_info) {
        this.course.modules_info.forEach((mod: any) => {
          if (mod.lessons_info) {
            mod.lessons_info.forEach((lesson: any) => {
              minutes += lesson.duration
            })
          }
        })
      }
      return minutes
    },
  },
})
</script>
