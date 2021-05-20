<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Lessons" />

    <ButtonNuxtLink
      class="mt-4 block w-36 ml-auto"
      label="Create Lesson"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ lessons.length }} lessons found
    </div>

    <div v-if="lessons.length" class="w-full mt-8">
      <nuxt-link
        v-for="(lesson, index) in lessons"
        :key="lesson.id"
        class="block py-2 px-4 w-full hover:bg-gray-200"
        :class="{
          'bg-gray-100': index % 2 === 0,
          'bg-gray-50': index % 2 !== 0,
        }"
        :to="lesson.id"
        append
      >
        <div class="flex imtes-center justify-between">
          <div>
            <span class="text-sm">{{ lesson.title }}</span>
          </div>
          <div class="capitalize text-xs p-2 bg-green-100 px-4 select-none">
            {{ lesson.language }}
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

  data() {
    return {
      lessons: [],
    }
  },

  async fetch() {
    try {
      const lessons = await this.$axios.$get('lessons/')
      if (lessons !== null) {
        this.lessons = lessons
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
