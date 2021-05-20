<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Courses" />

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
        <!-- <div>
          {{ course.title }}
        </div> -->
        <!-- <div class="text-xs text-gray-500">
          Created at {{ course.created_at }} | Updated at
          {{ course.updated_at }}
        </div> -->
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      courses: [],
    }
  },

  async fetch() {
    try {
      const courses = await this.$axios.$get('courses/')
      if (courses !== null) {
        this.courses = courses
      }
    } catch (error) {
      alert(
        `Error: ${
          error.message || error.data?.message || error.data?.response?.message
        }`
      )
    }
  },
})
</script>
