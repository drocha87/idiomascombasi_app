<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">New Lesson</h1>

    <div class="mt-8">
      <form @submit.prevent="save">
        <div class="flex justify-between">
          <Input
            v-model="lesson.title"
            class="w-1/2"
            label="Title"
            type="text"
            required
          />

          <Select v-model="lesson.language" label="Language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>

          <Select v-model="lesson.kind" label="Kind">
            <option value="regular">Regular</option>
            <option value="quizz">Quizz</option>
            <option value="test">Test</option>
          </Select>

          <Input
            v-model="duration"
            label="Duration in minutes"
            type="number"
            min="5"
          />
        </div>

        <Textarea
          v-model="lesson.description"
          class="mt-4"
          label="Description"
          required
        />

        <div class="text-right">
          <Button class="mt-4" type="submit" label="Save Lesson"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Lesson } from '@/types'

export default Vue.extend({
  data() {
    const lesson: Partial<Lesson> = {
      title: '',
      language: 'english',
      kind: 'regular',
      description: '',
    }

    return {
      lesson,
      duration: '60',
    }
  },

  methods: {
    async save() {
      this.lesson.duration = parseInt(this.duration)
      await this.$store.dispatch('admin/lessons/save', this.lesson)
    },
  },
})
</script>
