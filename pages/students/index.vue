<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="font-ember text-2xl font-light">
      Olá, {{ student.name || student.email }}
    </div>

    <ContainerSlot class="mt-8" title="Meus Cursos">
      <nuxt-link
        v-for="(course, index) in courses"
        :key="course.id"
        class="text-sm block"
        :to="`/students/courses/${course.course_id}`"
      >
        <div
          class="flex p-2"
          :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-gray-200': index % 2 !== 0,
          }"
        >
          <div class="ml-6 flex-grow">
            {{ courseName(course.course_id) }}
          </div>
        </div>

        <div
          v-if="courses.length === 0"
          class="text-sm text-center text-gray-600"
        >
          You still don't have any courses
        </div>
      </nuxt-link>
    </ContainerSlot>
    <ContainerSlot class="mt-8" title="Sugeridos para você">
      Diego Rocha
    </ContainerSlot>
    <ContainerSlot class="mt-8" title="Ferramentas">
      Diego Rocha
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  layout: 'empty',
  fetchOnServer: false,

  async fetch() {
    await this.$store.dispatch(
      'admin/students/fetchStudent',
      this.$auth.user.id
    )
    await this.$store.dispatch('admin/courses/fetchCourses')
  },

  computed: {
    student(): User {
      return this.$store.getters['admin/students/student']
    },

    courses(): any[] {
      if (this.student.courses) {
        return this.student.courses
      }
      return []
    },
  },

  methods: {
    courseName(id: string): string {
      return this.$store.getters['admin/courses/courseNameById'](id)
    },
  },
})
</script>
