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
    <ContainerSlot title="Courses" class="mt-8">
      <div class="flex items-end mb-8">
        <Input
          v-model="filterCourse"
          class="w-1/3"
          label="Search by matching word"
          placeholder="Search course"
        />
        <SelectLanguage
          v-model="filterLang"
          class="ml-8 w-36"
          label="Filter by language"
        />
      </div>

      <InfoCourse
        v-for="course in courses"
        :key="course.id"
        class="mb-2"
        :course="course"
      >
      </InfoCourse>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      filterCourse: '',
      filterLang: '',
    }
  },

  async fetch() {
    await this.$store.dispatch('admin/courses/fetchCourses')
  },

  computed: {
    courses(): Course[] {
      const courses: Course[] = this.$store.getters['admin/courses/courses']
      return courses
        .filter(
          (q: Course) =>
            this.filterLang === '' || this.filterLang === q.language
        )
        .filter((q: Course) => {
          const regex = new RegExp(this.filterCourse, 'gi')
          return this.filterCourse === '' || regex.test(q.title)
        })
    },
  },
})
</script>
