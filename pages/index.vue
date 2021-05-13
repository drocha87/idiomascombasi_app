<template>
  <div class="max-w-screen-xl mx-auto p-12">
    <h4 class="text-center text-4xl font-antonio">Olá, Diego Rocha</h4>
    <div class="mt-12">
      <div>
        <h3 class="text-xl">Cursos</h3>

        <div v-for="course in courses" :key="course.id">
          <div
            class="
              flex flex-col
              mt-8
              max-w-xs
              border border-gold border-opacity-40
              p-4
            "
          >
            <div>Image</div>
            <div class="text-xs">Criado em {{ course.created_at }}</div>
            <div class="text-xl font-medium">{{ course.title }}</div>
            <div class="text-xs font-medium mt-1">
              {{ course.language }} {{ course.level }}
            </div>
            <div class="my-4 text-sm tracking-wide text-gray-700">
              {{ course.description }}
            </div>
            <div class="font-medium">
              {{ course.kind }} ({{ course.platform }})
            </div>
            <div class="text-xs font-medium text-gray-700 mt-4">
              Começa em {{ course.start_at }}
            </div>
            <div class="text-xs font-medium text-gray-700">
              Expira em {{ course.expire_at }}
            </div>
            <Button class="mt-8" small>Saiba Mais</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// interface Course {
//   id: number
//   image: string
//   title: string
//   created_at: string
//   level: string
//   language: string
//   description: string
//   kind: string
//   platform: string
//   start_at: string
//   expire_at: string
// }

export default Vue.extend({
  fetchOnServer: false,

  fetch() {
    this.$store.dispatch('courses/fetchCourses')
  },

  computed: {
    courses(): any[] {
      return this.$store.getters['courses/courses']
    },
  },
})
</script>
