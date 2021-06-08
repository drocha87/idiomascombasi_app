<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">Students</h1>

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

    <ContainerSlot title="Students">
      <div class="flex items-end mb-8">
        <Input
          v-model="filterUser"
          class="w-1/3"
          label="Search by matching word"
          placeholder="Search course"
        />
      </div>

      <InfoStudent
        v-for="student in students"
        :key="student.id"
        class="mb-2"
        :student="student"
      />
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      filterUser: '',
    }
  },

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
      const users: User[] = this.$store.getters['admin/students/students']
      return users.filter((q: User) => {
        const regex = new RegExp(this.filterUser, 'gi')
        return (
          this.filterUser === '' ||
          regex.test(q.name) ||
          regex.test(q.email) ||
          regex.test(q.nickname)
        )
      })
    },
  },
})
</script>
