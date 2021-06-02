<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Question Creator" />

    <div class="mt-8">
      <form @submit.prevent="save">
        <div class="flex">
          <Textarea
            v-model="question.title"
            class="flex-grow"
            label="Question"
            type="text"
            rows="4"
            required
          />

          <div class="flex flex-col ml-8">
            <SelectLanguage v-model="question.language" />
            <SelectLevel v-model="question.level" class="mt-4" />
          </div>
        </div>

        <div class="text-right">
          <Button class="mt-4" type="submit" label="Save Question"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Question } from '@/types'

export default Vue.extend({
  data() {
    const question: Partial<Question> = {
      title: '',
      language: 'english',
      level: 200,
    }

    return {
      question,
    }
  },

  methods: {
    async save() {
      await this.$store.dispatch('admin/questions/save', this.question)
    },
  },
})
</script>
