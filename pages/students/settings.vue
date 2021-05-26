<template>
  <div class="max-w-screen-sm mx-auto">
    <div class="font-ember text-2xl font-light">Settings</div>
    <form class="mt-8" @submit.prevent="$store.dispatch('student/updateInfo')">
      <Input
        v-model.trim="email"
        class="w-full"
        label="Email"
        hint="Email used to signin in this account"
        type="text"
        disabled
      />

      <Input
        v-model.trim="name"
        class="mt-4 w-full"
        label="Name"
        hint="How do you like to be called"
        type="text"
        required
      />

      <Textarea
        v-model.trim="bio"
        class="mt-4"
        label="Bio"
        hint="Describe yourself, so we can share more about you with other students"
      />

      <div class="text-right mt-4">
        <Button type="submit" label="Update" small> </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  fetch() {
    this.$store.dispatch('student/fetchStudent')
  },

  computed: {
    student(): User {
      return this.$store.getters['student/student']
    },

    email(): string {
      return this.student.email
    },

    name: {
      get(): string {
        return this.student.name
      },
      set(val: string) {
        this.$store.commit('student/SET_NAME', val)
      },
    },

    bio: {
      get(): string {
        return this.student.bio
      },
      set(val: string) {
        this.$store.commit('student/SET_BIO', val)
      },
    },
  },
})
</script>
