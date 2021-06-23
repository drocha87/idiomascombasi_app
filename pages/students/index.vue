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

      <ContainerSlot
        v-if="freebies && freebies.length"
        class="mt-8"
        title="Freebies"
        subtitle="Este são os Freebies disponíveis segundo os seus interesses. Caso você esteja interessada(o) em outros tipos de Freebies, vá até settings e altere seus interesses adicionando ou removendo idiomas."
      >
        <div
          v-for="(course, index) in freebies"
          :key="course.id"
          class="text-sm block"
          :to="`/students/courses/${course.id}`"
        >
          <div
            class="flex p-2"
            :class="{
              'bg-gray-100': index % 2 === 0,
              'bg-gray-200': index % 2 !== 0,
            }"
          >
            <div class="ml-6 flex-grow">
              {{ freebieName(course.id) }}
            </div>
            <button
              type="button"
              class="text-xs text-red-500 px-4 font-bold text-blue-900"
              @click="$store.dispatch('student/addFreebie', course.id)"
            >
              Adicionar
            </button>
            <nuxt-link
              class="text-xs text-green-800 px-4"
              :to="`/course/${course.id}`"
            >
              Visitar
            </nuxt-link>
          </div>
        </div>
      </ContainerSlot>

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
import { User, Course, UserCourse } from '@/types'

export default Vue.extend({
  layout: 'empty',
  // fetchOnServer: false,

  async fetch() {
    await this.$store.dispatch('student/fetchStudent')
    await this.$store.dispatch('student/fetchCourses')
    await this.$store.dispatch('student/fetchFreebies')
  },

  computed: {
    student(): User {
      return this.$store.getters['student/student']
    },

    courses(): UserCourse[] {
      if (this.student.courses) {
        return this.student.courses
      }
      return []
    },

    freebies(): Course[] {
      const freebies: Course[] = this.$store.getters['student/freebies']
      return freebies.filter(
        (freebie: Course) =>
          !this.courses.some(
            (course: UserCourse) => course.course_id === freebie.id
          )
      )
    },
  },

  mounted() {
    if (this.student?.interests?.length === 0) {
      this.$router.push({
        path: '/students/interests',
        query: { firstAccess: true },
      })
    }
  },

  methods: {
    courseName(id: string): string {
      return this.$store.getters['student/courseNameById'](id)
    },
    freebieName(id: string): string {
      return this.$store.getters['student/freebieNameById'](id)
    },
  },
})
</script>

<style lang="postcss" scoped>
.banner {
  @apply bg-banner-pattern bg-cover bg-no-repeat bg-fixed h-52 p-8 border-b;
}
</style>
