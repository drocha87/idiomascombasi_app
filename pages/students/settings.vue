<template>
  <div class="max-w-screen-sm mx-auto">
    <div class="font-ember text-2xl font-light">Settings</div>
    <form
      class="mt-8"
      @submit.prevent="$store.dispatch('admin/courses/updateBody')"
    >
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
        required
      />

      <div class="text-right mt-4">
        <Button type="submit" label="Update" small> </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    student() {
      return this.$auth.user
    },

    email(): string {
      return this.student.email
    },

    name(): string {
      return this.student.name
    },

    bio(): string {
      return this.student.bio
    },
  },

  methods: {
    update() {},
  },
})
</script>
