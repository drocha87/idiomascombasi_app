<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Lessons" />

    <ButtonNuxtLink
      class="mt-4 block w-36 ml-auto"
      label="New Question"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ questions.length }} questions found
    </div>

    <div v-if="questions.length" class="w-full mt-8">
      <InfoQuestion
        v-for="question in questions"
        :key="question.id"
        :question="question"
      >
      </InfoQuestion>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Question } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  async fetch() {
    await this.$store.dispatch('admin/questions/fetchQuestions')
  },

  computed: {
    questions(): Question[] {
      return this.$store.getters['admin/questions/questions']
    },
  },
})
</script>
