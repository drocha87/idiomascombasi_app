<template>
  <form @submit.prevent="$store.dispatch('admin/courses/updateBody')">
    <div class="p-4 bg-gray-50 mt-4">
      <div class="text-sm text-gray-500">Description preview</div>
      <client-only>
        <vue-markdown
          class="text-sm font-ember font-light mt-2"
          emoji
          html
          :source="description"
        >
        </vue-markdown>
      </client-only>
    </div>

    <Textarea
      v-model.trim="description"
      class="mt-4"
      label="Description"
      hint="You can use html tags to style the text"
      required
    />

    <Textarea
      v-model.trim="wywl"
      class="mt-4"
      label="What you'll learn"
      hint="You can split your text by paragraphs if you let an empty line between them"
    />

    <Textarea
      v-model.trim="requiriments"
      class="mt-4"
      label="Requirements"
      hint="You can split your text by paragraphs if you let an empty line between them"
    />

    <div class="text-right mt-4">
      <Button type="submit" label="Update" small> </Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  computed: {
    course(): Course {
      return this.$store.getters['admin/courses/course']
    },

    description: {
      get(): string {
        return this.course.description
      },
      set(value: string): void {
        this.$store.commit('admin/courses/SET_COURSE_DESCRIPTION', value)
      },
    },

    wywl: {
      get(): string {
        return this.course.wywl
      },
      set(value: string): void {
        this.$store.commit('admin/courses/SET_COURSE_WYWL', value)
      },
    },

    requiriments: {
      get(): string {
        return this.course.requiriments
      },
      set(value: string): void {
        this.$store.commit('admin/courses/SET_COURSE_REQUIRIMENTS', value)
      },
    },
  },
})
</script>
