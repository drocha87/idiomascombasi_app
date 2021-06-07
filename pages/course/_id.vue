<template>
  <div class="max-w-screen-md mx-auto p-0 md:p-12">
    <div class="flex flex-col md:flex-row items-start">
      <div class="md:w-3/4 mt-2 md:mt-0 md:pr-8 order-2 md:order-1 p-4">
        <h6 class="font-ember text-gold capitalize">{{ course.language }}</h6>
        <h3 class="text-3xl font-ember font-medium">{{ course.title }}</h3>
        <p class="mt-4 font-ember font-light">{{ course.short_description }}</p>
        <Button
          class="block w-full md:w-auto mt-8 h-14"
          label="Participar do curso"
        ></Button>
      </div>
      <div class="md:w-1/4 order-1 md:order-2">
        <img
          class="object-cover"
          src="https://res.cloudinary.com/euyome/image/upload/v1619895563/idiomascombasi/conversation-group-banner_ltmnl5.jpg"
          alt="idiomascombasi"
        />
      </div>
    </div>

    <div class="mt-9 mx-4 border border-gold border-opacity-20 p-4 bg-gray-100">
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
    </div>
    <CourseInfo
      class="mt-8 mx-4"
      :course="course"
      :modules="modules"
      :lessons="lessons"
    />

    <ContainerSlot class="mt-8 mx-4" title="Descrição">
      <client-only>
        <div class="font-ember text-gray-800 tracking-wide font-light">
          <vue-markdown emoji html :source="course.description"> </vue-markdown>
        </div>
      </client-only>
    </ContainerSlot>

    <CourseModules
      v-if="modules.length"
      :modules="modules"
      :lessons="lessons"
      class="mt-8 mx-4"
    />

    <div class="p-4 md:p-0 mt-8">
      <Button
        class="block w-full md:w-48 md:ml-auto"
        label="Participar do curso"
      >
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, Module, Lesson } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {}
  },

  async fetch() {
    await this.$store.dispatch(
      'public/courses/fetchCourse',
      this.$route.params.id
    )
    await this.$store.dispatch('public/courses/fetchCourseModules')
    await this.$store.dispatch('public/courses/fetchCourseLessons')
  },

  computed: {
    course(): Course {
      return this.$store.getters['public/courses/course']
    },

    modules(): Module[] {
      return this.$store.getters['public/courses/modules']
    },

    lessons(): Lesson[] {
      return this.$store.getters['public/courses/lessons']
    },

    wywl(): string[] {
      const goals = this.course?.wywl
      return goals ? goals.split('\n\n') : []
    },
  },
})
</script>
