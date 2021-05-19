<template>
  <div class="max-w-screen-md mx-auto p-12">
    <div class="flex items-start">
      <div class="w-3/4 pr-8">
        <h6 class="text-sm capitalize">Idioma {{ course.language }}</h6>
        <h3 class="text-3xl font-bold">{{ course.title }}</h3>
        <p class="mt-4">{{ course.description }}</p>
        <div class="mt-4 text-xs flex flex-wrap justify-between">
          <div>Inicia em {{ course.start_at }}</div>
          <div>Termina em {{ course.expire_at }}</div>
        </div>
      </div>
      <div class="w-1/4">
        <img
          class="object-cover"
          src="https://res.cloudinary.com/euyome/image/upload/v1619895563/idiomascombasi/conversation-group-banner_ltmnl5.jpg"
          alt="idiomascombasi"
        />
      </div>
    </div>

    <CourseInfo class="mt-8" :course="course" />

    <div class="mt-9 border border-gold border-opacity-20 p-4 bg-gray-100">
      <TitleSmall>O que você aprenderá</TitleSmall>
      <div class="mt-4 flex flex-wrap">
        <div v-for="(goal, index) in wywl" :key="index" class="flex w-1/2 p-2">
          <div>
            <IconDone size="16px" />
          </div>
          <div class="ml-4 text-sm">
            {{ goal }}
          </div>
        </div>
      </div>
    </div>
    <CourseModules v-if="course.modules_info" class="mt-8" />
    <Button class="block max-w-1/2 ml-auto mt-8"> Participar do curso </Button>
    <!-- <div class="mt-8 border p-4">
      <TitleSmall>Modulos</TitleSmall>
      <div class="mt-4">
        <div
          class="p-2 text-sm pl-6 font-medium text-gray-900 border-t border-b"
        >
          Modulo 1
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 2
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 3
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 4
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 5
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 6
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {}
  },

  fetch() {
    this.$store.dispatch('courses/fetchCourse', this.$route.params.id)
  },

  computed: {
    course(): any {
      return this.$store.getters['courses/course']
    },

    wywl(): string[] {
      const goals = this.course?.wywl
      return goals ? goals.split('\n\n') : []
    },
  },
})
</script>
