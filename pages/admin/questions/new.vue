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
            <Select v-model="question.language" label="Language">
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="portuguese">Portuguese</option>
            </Select>
            <Select v-model="question.level" class="mt-4" label="Level">
              <option :value="200">A1</option>
              <option :value="400">A2</option>
              <option :value="600">B1</option>
              <option :value="800">B2</option>
              <option :value="1000">C1</option>
              <option :value="1200">C2</option>
            </Select>
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
