<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Questionaires" />

    <ButtonNuxtLink
      class="mt-4 block w-36 ml-auto"
      label="New Questionaire"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ questions.length }} questionares found
    </div>

    <div v-if="questions.length" class="w-full mt-8">
      <InfoQuestionaire
        v-for="question in questions"
        :key="question.id"
        :questionaire="question"
      >
      </InfoQuestionaire>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Question } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  async fetch() {
    await this.$store.dispatch('admin/questionaires/fetchQuestionaires')
  },

  computed: {
    questions(): Question[] {
      return this.$store.getters['admin/questionaires/questionaires']
    },
  },
})
</script>
