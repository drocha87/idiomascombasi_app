<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Lessons</h1>

    <ButtonNuxtLink
      class="mt-4 block w-36 ml-auto"
      label="Create Lesson"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ lessons.length }} lessons found
    </div>

    <ContainerSlot title="Lessons">
      <div class="flex items-end mb-8">
        <Input
          v-model="filterLesson"
          class="w-1/3"
          label="Search by matching word"
          placeholder="Search lesson"
        />
        <SelectLanguage
          v-model="filterLang"
          class="ml-8 w-36"
          label="Filter by language"
        />
      </div>

      <InfoLesson
        v-for="lesson in lessons"
        :key="lesson.id"
        class="mb-2"
        :lesson="lesson"
      >
        <div class="flex imtes-center justify-between">
          <div>
            <span class="text-sm">{{ lesson.title }}</span>
          </div>
          <div class="capitalize text-xs p-2 bg-green-100 px-4 select-none">
            {{ lesson.language }}
          </div>
        </div>
      </InfoLesson>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Lesson } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      filterLesson: '',
      filterLang: '',
    }
  },

  async fetch() {
    await this.$store.dispatch('admin/lessons/fetchLessons')
  },

  computed: {
    lessons(): Lesson[] {
      const lessons: Lesson[] = this.$store.getters['admin/lessons/lessons']
      return lessons
        .filter(
          (q: Lesson) =>
            this.filterLang === '' || this.filterLang === q.language
        )
        .filter((q: Lesson) => {
          const regex = new RegExp(this.filterLesson, 'gi')
          return this.filterLesson === '' || regex.test(q.title)
        })
    },
  },
})
</script>
