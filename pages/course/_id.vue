<template>
  <div class="max-w-screen-md mx-auto p-12">
    <div class="flex items-start">
      <div>
        <h6 class="text-sm">Idioma {{ course.language }}</h6>
        <h3 class="text-3xl font-bold">{{ course.title }}</h3>
        <p class="mt-4">{{ course.description }}</p>
      </div>
      <div class="w-3/4">
        <img
          class="object-cover"
          src="https://res.cloudinary.com/euyome/image/upload/v1619895563/idiomascombasi/conversation-group-banner_ltmnl5.jpg"
          alt="idiomascombasi"
        />
      </div>
    </div>
    <div class="mt-9 border border-gold border-opacity-20 p-4 bg-gray-100">
      <TitleSmall>O que você aprenderá</TitleSmall>
      <div class="mt-4 flex flex-wrap">
        <div
          v-for="(goal, index) in goals"
          :key="index"
          class="flex max-w-1/2 py-2"
        >
          <div>
            <IconDone size="16px" />
          </div>
          <div class="ml-4 text-xs">
            {{ goal }}
          </div>
        </div>
      </div>
    </div>
    <CourseModules class="mt-8" />
    <Button class="block max-w-1/2 ml-auto mt-8"> Participar do curso </Button>
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
export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      goals: [
        'You will rapidly build a solid foundation of Spanish.',
        'You will produce and speak thousands of perfectly constructed phrases.',
        'You will have practical usage of basic Spanish in a matter of weeks.',
        'You will speak with good pronunciation due to constant repetition and imitation of native Spanish speaker.',
        'You will remember at least 98% of the everything taught, due to the system of constant repetition and recycling of new language.',
      ],
    }
  },

  fetch() {
    this.$store.dispatch('courses/fetchCourse', this.$route.params.id)
  },

  computed: {
    course(): string {
      return this.$store.getters['courses/course']
    },
  },
})
</script>
