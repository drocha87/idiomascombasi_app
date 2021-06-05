<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">New Questionaire</h1>

    <div class="mt-8">
      <form @submit.prevent="save">
        <div class="flex">
          <Input
            v-model="questionaire.title"
            class="flex-grow"
            label="Title"
            type="text"
            required
          />
          <Select v-model="questionaire.language" class="ml-8" label="Language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>
        </div>

        <div class="flex">
          <Textarea
            v-model="questionaire.description"
            class="flex-grow"
            label="Description"
            type="text"
            rows="4"
            required
          />
        </div>

        <div class="text-right">
          <Button class="mt-4" type="submit" label="Save"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Questionaire } from '@/types'

export default Vue.extend({
  data() {
    const questionaire: Partial<Questionaire> = {
      title: '',
      description: '',
      language: 'english',
    }

    return {
      questionaire,
    }
  },

  methods: {
    async save() {
      await this.$store.dispatch('admin/questionaires/save', this.questionaire)
    },
  },
})
</script>
