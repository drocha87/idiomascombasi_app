<template>
  <div class="max-w-screen-xl mx-auto p-12">
    <div class="mt-12">
      <h3 class="text-xl">Cursos</h3>
      <div class="flex">
        <div v-for="course in courses" :key="course.id">
          <Course :course="course" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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

  methods: {
    gotoCourse(id: string): void {
      this.$router.push({ path: `/course/${id}` })
    },
  },
})
</script>
