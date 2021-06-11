<template>
  <div class="max-w-screen-md mx-auto">
    <CourseHeader class="md:mt-24" :course="course">
      <template #action="{ item }">
        <nuxt-link class="text-purple-700" :to="`/course/${item.id}`">
          Ver detalhes do curso.
        </nuxt-link>
      </template>
    </CourseHeader>
    <!-- <div class="flex flex-col md:flex-row items-start">
      <div class="md:w-3/4 mt-2 md:mt-0 md:pr-8 order-2 md:order-1 px-4">
        <h6 class="font-ember text-gold capitalize">{{ course.language }}</h6>
        <h3 class="text-3xl font-ember font-medium">{{ course.title }}</h3>
        <p class="mt-4 font-ember font-light">
          {{ course.short_description }}
        </p>
      </div>
      <div v-if="course && course.image" class="md:w-1/4 order-1 md:order-2">
        <img class="object-cover" :src="course.image" alt="idiomascombasi" />
      </div>
    </div> -->

    <CourseInfo
      class="mt-8 mx-4 md:mx-0"
      :course="course"
      :modules="modules"
      :lessons="lessons"
    />

    <StudentCourseModules
      v-if="modules.length"
      :course="course"
      :modules="modules"
      :lessons="lessons"
      class="mt-8 mx-4 md:mx-0"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, Module, Lesson } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {}
  },

  async fetch() {
    await this.$store.dispatch('student/fetchCourse', this.$route.params.id)
    this.$store.dispatch('student/fetchCourseModules')
    this.$store.dispatch('student/fetchCourseLessons')
  },

  computed: {
    course(): Course {
      return this.$store.getters['student/course']
    },

    modules(): Module[] {
      return this.$store.getters['student/modules']
    },

    lessons(): Lesson[] {
      return this.$store.getters['student/lessons']
    },

    wywl(): string[] {
      const goals = this.course?.wywl
      return goals ? goals.split('\n\n') : []
    },
  },
})
</script>
