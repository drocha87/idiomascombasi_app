<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Courses</h1>

    <ButtonNuxtLink
      class="mt-4 block w-36 ml-auto"
      label="Create Course"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ courses.length }} courses found
    </div>
    <div v-if="courses.length" class="w-full mt-8">
      <nuxt-link
        v-for="(course, index) in courses"
        :key="course.id"
        class="block py-2 px-4 w-full"
        :class="{
          'bg-gray-100': index % 2 === 0,
          'bg-gray-50': index % 2 !== 0,
        }"
        :to="course.id"
        append
      >
        <div class="flex imtes-center justify-between">
          <div>
            <span class="text-sm">{{ course.title }}</span>
          </div>
          <div class="capitalize text-xs p-2 bg-green-100 px-4 select-none">
            {{ course.language }}
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  fetchOnServer: false,

  async fetch() {
    await this.$store.dispatch('admin/courses/fetchCourses')
  },

  computed: {
    courses() {
      return this.$store.getters['admin/courses/courses']
    },
  },
})
</script>
