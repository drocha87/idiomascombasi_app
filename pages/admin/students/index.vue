<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Students" />

    <ButtonNuxtLink
      class="mt-4 block w-36 ml-auto"
      label="Add Student"
      to="new"
      append
    >
    </ButtonNuxtLink>

    <div class="mt-4 text-left w-full text-sm">
      {{ students.length }} students found
    </div>

    <div v-if="students.length" class="w-full mt-8">
      <nuxt-link
        v-for="(student, index) in students"
        :key="student.id"
        class="block py-2 px-4 w-full hover:bg-gray-200"
        :class="{
          'bg-gray-100': index % 2 === 0,
          'bg-gray-50': index % 2 !== 0,
        }"
        :to="student.id"
        append
      >
        <div class="flex imtes-center justify-between">
          <div>
            <span class="text-sm">{{ student.name || student.email }}</span>
          </div>
          <!-- <div class="capitalize text-xs p-2 bg-green-100 px-4 select-none">
            {{ student.language }}
          </div> -->
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  async fetch() {
    try {
      await this.$store.dispatch('admin/students/fetchStudents')
    } catch (error) {
      alert(
        `Error: ${
          error.message || error.data?.message || error.data?.response?.message
        }`
      )
    }
  },

  computed: {
    students(): User[] {
      return this.$store.getters['admin/students/students']
    },
  },
})
</script>
