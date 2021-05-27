<template>
  <div class="max-w-screen-md mx-auto p-4 md:px-12">
    <div class="flex flex-col md:flex-row items-start">
      <div class="md:w-3/4 mt-2 md:mt-0 md:pr-8 order-2 md:order-1">
        <h6 class="font-ember text-gold capitalize">{{ course.language }}</h6>
        <h3 class="text-3xl font-ember font-medium">{{ course.title }}</h3>
        <p class="mt-4 font-ember font-light">
          {{ course.short_description }}
          <nuxt-link class="text-purple-700" :to="`/course/${course.id}`">
            Ver detalhes do curso.
          </nuxt-link>
        </p>
      </div>
      <div class="md:w-1/4 order-1 md:order-2">
        <img
          class="object-cover"
          src="https://res.cloudinary.com/euyome/image/upload/v1619895563/idiomascombasi/conversation-group-banner_ltmnl5.jpg"
          alt="idiomascombasi"
        />
      </div>
    </div>

    <CourseInfo class="mt-8" :course="course" />

    <ContainerSlot title="Resources" class="font-ember mt-8">
      <p class="text-xs font-ember text-gray-700">
        These are your course resources. These number of resources can change,
        since the Teacher can add more resources in the future. Not all
        resources are ready to use.
      </p>
      <div class="flex flex-wrap mt-2">
        <div class="w-1/3">
          <ResourceInfo
            class="m-1"
            label="Audios"
            :quantity="2"
            to="quizzes"
            append
          />
        </div>
        <div class="w-1/3">
          <ResourceInfo class="m-1" label="Documents" :quantity="2" to="/" />
        </div>
        <div class="w-1/3">
          <ResourceInfo
            class="m-1"
            label="Videos"
            :quantity="2"
            to="videos"
            append
          />
        </div>
        <div class="w-1/3">
          <ResourceInfo class="m-1" label="Quizzes" :quantity="2" to="/" />
        </div>
        <div class="w-1/3">
          <ResourceInfo class="m-1" label="Tests" :quantity="2" to="/" />
        </div>
      </div>
    </ContainerSlot>
    <!-- <div class="mt-9 border border-gold border-opacity-20 p-4 bg-gray-100">
      <TitleSmall>O que você aprenderá</TitleSmall>
      <div class="mt-4 flex flex-wrap">
        <div
          v-for="(goal, index) in wywl"
          :key="index"
          class="flex md:w-1/2 w-full p-2"
        >
          <div>
            <IconDone size="16px" />
          </div>
          <div class="ml-4 text-sm">
            {{ goal }}
          </div>
        </div>
      </div>
    </div> -->

    <!-- <ContainerSlot class="mt-8" title="Descrição">
      <div class="font-ember text-gray-800 tracking-wide font-light">
        <vue-markdown emoji html :source="course.description"> </vue-markdown>
      </div>
    </ContainerSlot> -->

    <StudentCourseModules v-if="course.modules_info" class="mt-8" />

    <!-- <div class="mt-8 border p-4">
      <TitleSmall>Modulos</TitleSmall>
      <div class="mt-4">
        <div
          class="p-2 text-sm pl-6 font-medium text-gray-900 border-t border-b"
        >
          Modulo 1
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 2
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 3
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 4
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 5
        </div>
        <div class="p-2 text-sm pl-6 font-medium text-gray-900 border-b">
          Modulo 6
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {}
  },

  fetch() {
    this.$store.dispatch('public/courses/fetchCourse', this.$route.params.id)
  },

  computed: {
    course(): Course {
      return this.$store.getters['public/courses/currentCourse']
    },

    wywl(): string[] {
      const goals = this.course?.wywl
      return goals ? goals.split('\n\n') : []
    },
  },
})
</script>
