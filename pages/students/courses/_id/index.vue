<template>
  <div class="max-w-screen-md mx-auto">
    <CourseHeader class="md:mt-24" :course="course">
      <template #action="{ item }">
        <nuxt-link class="text-purple-700" :to="`/course/${item.id}`">
          Ver detalhes do curso.
        </nuxt-link>
      </template>
    </CourseHeader>

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

interface ResponseData {
  course?: Partial<Course>
  modules?: Module[]
  lessons?: Lesson[]
}

export default Vue.extend({
  // fetchOnServer: false,
  data() {
    const data: ResponseData = {
      course: {},
      modules: [],
      lessons: [],
    }
    return {
      data,
    }
  },

  async fetch() {
    try {
      this.data = await this.$axios.$get(
        `/students/courses/${this.$route.params.id}`
      )
    } catch (error) {
      if (error.response.status === 404) {
        this.$nuxt.error({
          statusCode: 404,
          message:
            'Course not found or student do not have access to this content.',
        })
      }
    }
  },

  computed: {
    course(): Partial<Course> {
      return this.data.course || {} /* this.$store.getters['student/course'] */
    },

    modules(): Module[] {
      return (
        this.data.modules || []
      ) /* this.$store.getters['student/modules'] */
    },

    lessons(): Lesson[] {
      return (
        this.data.lessons || []
      ) /* this.$store.getters['student/lessons'] */
    },

    wywl(): string[] {
      const goals = this.course?.wywl
      return goals ? goals.split('\n\n') : []
    },
  },
})
</script>
