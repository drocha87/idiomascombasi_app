<template>
  <div>
    <div class="banner">
      <div class="md:relative flex md:mx-auto max-w-screen-lg">
        <div
          class="
            font-ember
            mx-auto
            md:absolute
            w-80
            h-32
            pt-4
            p-2
            md:top-4 md:right-12
            bg-white
            shadow
          "
        >
          <p class="text-2xl font-medium text-gray-800">
            Embrace a new language
          </p>
          <p class="text-sm mt-1 text-gray-600">
            Learn a new language with confidence to impress anyone
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-screen-lg mx-auto px-4">
      <div class="text-4xl font-ember font-light mt-8 z-50">
        Olá, {{ student.nickname || student.name || student.email }}
      </div>

      <ContainerSlot
        v-if="courses && courses.length"
        class="mt-8"
        title="Meus Cursos"
      >
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
      <div v-else class="mt-12 text-center text-2xl">
        Que pena, atualmente você não está fazendo parte de nenhum curso!
      </div>

      <ContainerSlot class="mt-8" title="Links Úteis">
        <InfoLink
          label="Dicionário de Inglês"
          description="Explore the Cambridge Dictionary"
          to="https://dictionary.cambridge.org/"
        />
      </ContainerSlot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  layout: 'empty',
  // fetchOnServer: false,

  async fetch() {
    await this.$store.dispatch('student/fetchStudent')
    await this.$store.dispatch('student/fetchCourses')
  },

  computed: {
    student(): User {
      return this.$store.getters['student/student']
    },

    courses(): any[] {
      if (this.student.courses) {
        return this.student.courses
      }
      return []
    },
  },

  mounted() {
    if (this.student?.interests?.length === 0) {
      this.$router.push({ path: '/students/first-login' })
    }
  },

  methods: {
    courseName(id: string): string {
      return this.$store.getters['student/courseNameById'](id)
    },
  },
})
</script>

<style lang="postcss" scoped>
.banner {
  @apply bg-banner-pattern bg-cover bg-no-repeat bg-fixed h-52 p-8 border-b;
}
</style>
