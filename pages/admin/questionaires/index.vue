<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Questionaires</h1>

    <ButtonNuxtLink
      class="mt-4 block w-40 ml-auto"
      label="New Questionaire"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ questions.length }} questionares found
    </div>

    <ContainerSlot title="Questionaires" class="mt-8">
      <div class="flex items-end mb-8">
        <Input
          v-model="filterQuestionaire"
          class="w-1/3"
          label="Search by matching word"
          placeholder="Search course"
        />
        <SelectLanguage
          v-model="filterLang"
          class="ml-8 w-36"
          label="Filter by language"
        />
      </div>

      <InfoQuestionaire
        v-for="questionaire in questionaires"
        :key="questionaire.id"
        :questionaire="questionaire"
      >
      </InfoQuestionaire>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Questionaire } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      filterQuestionaire: '',
      filterLang: '',
    }
  },

  async fetch() {
    await this.$store.dispatch('admin/questionaires/fetchQuestionaires')
  },

  computed: {
    questionaires(): Questionaire[] {
      const qs: Questionaire[] =
        this.$store.getters['admin/questionaires/questionaires']
      return qs
        .filter(
          (q: Questionaire) =>
            this.filterLang === '' || this.filterLang === q.language
        )
        .filter((q: Questionaire) => {
          const regex = new RegExp(this.filterQuestionaire, 'gi')
          return this.filterQuestionaire === '' || regex.test(q.title)
        })
    },
  },
})
</script>
