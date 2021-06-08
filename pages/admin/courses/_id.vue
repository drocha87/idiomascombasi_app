<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">{{ course.title }}</h1>

    <div v-if="course.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="course.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="course.updated_at" />
      </div>
    </div>

    <div class="mt-8">
      <ReleaseCourse :course="course" />
      <FormCourseHeader />
      <FormCourseContent />
      <AdminCourseModules />
      <AvailablesModules :course="course" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      toggle: true,
    }
  },

  async fetch() {
    const { id } = this.$route.params
    await this.$store.dispatch('admin/courses/fetchCourse', id)
    await this.$store.dispatch('admin/modules/fetchModules')
  },

  computed: {
    course(): Course {
      return this.$store.getters['admin/courses/currentCourse']
    },
  },
})
</script>
