<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Questions</h1>

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

    <ContainerSlot class="w-full mt-8" title="Questions">
      <div class="flex items-end mb-8">
        <Input
          v-model="filterQuestion"
          class="w-1/3"
          label="Search by matching word"
          placeholder="Search question"
        />
        <SelectLanguage
          v-model="filterLang"
          class="ml-8 w-36"
          label="Filter by language"
        />
      </div>

      <InfoQuestion
        v-for="question in questions"
        :key="question.id"
        class="mb-2"
        :question="question"
      >
      </InfoQuestion>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Question } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      filterQuestion: '',
      filterLang: '',
    }
  },

  async fetch() {
    await this.$store.dispatch('admin/questions/fetchQuestions')
  },

  computed: {
    questions(): Question[] {
      const questions: Question[] =
        this.$store.getters['admin/questions/questions']
      return questions
        .filter(
          (q: Question) =>
            this.filterLang === '' || this.filterLang === q.language
        )
        .filter((q: Question) => {
          const regex = new RegExp(this.filterQuestion, 'gi')
          return this.filterQuestion === '' || regex.test(q.title)
        })
    },
  },
})
</script>
