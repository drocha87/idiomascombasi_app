<template>
  <form
    class="mt-8"
    @submit.prevent="$store.dispatch('admin/courses/updateHeader')"
  >
    <div class="flex justify-between">
      <Input
        v-model.trim="title"
        class="w-full"
        label="Title"
        type="text"
        required
      />

      <Select v-model="course.language" class="ml-4" label="Language" disabled>
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="portuguese">Portuguese</option>
      </Select>

      <Select v-model="course.kind" class="ml-4" label="Kind" disabled>
        <option value="recorded">Recorded</option>
        <option value="live">Live</option>
        <option value="mixed">Mixed</option>
      </Select>
    </div>

    <div class="flex items-end mt-4">
      <Input v-model.trim="image" class="flex-grow" label="Image" type="url" />
      <!-- <Input
            v-model="course.author"
            class="flex-grow mx-4"
            label="Author"
            type="text"
            required
          /> -->
      <Input
        v-model="expiresAt"
        class="ml-4"
        label="Expires At"
        hint="If the course should not expire, leave this field without date"
        type="date"
      />
    </div>

    <Textarea
      v-model.trim="short_description"
      class="mt-4"
      label="Short Description"
      hint="You can use html tags to style the text"
      required
    />

    <div class="flex justify-between text-right mt-4">
      <Button
        type="button"
        label="Remove Course"
        small
        bg-color="red"
        @click="removeCourse()"
      >
      </Button>
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
      return this.$store.getters['admin/courses/currentCourse']
    },

    title: {
      get(): string {
        return this.course.title
      },
      set(value: string): void {
        this.$store.commit('admin/courses/SET_COURSE_TITLE', value)
      },
    },

    image: {
      get(): string {
        return this.course.image
      },
      set(value: string): void {
        this.$store.commit('admin/courses/SET_COURSE_IMAGE', value)
      },
    },

    short_description: {
      get(): string {
        return this.course.short_description
      },
      set(value: string): void {
        this.$store.commit('admin/courses/SET_COURSE_SHORT_DESCRIPTION', value)
      },
    },

    expiresAt: {
      get(): string {
        const date = this.course.expires_at || ''
        return date.split('T')[0]
      },
      set(value: string): void {
        this.$store.commit('admin/courses/SET_COURSE_EXPIRESAT', value)
      },
    },
  },
})
</script>
