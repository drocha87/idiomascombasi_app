<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">New Student</h1>

    <ContainerSlot title="Insert a new student" class="mt-8">
      <form @submit.prevent="save">
        <div class="flex">
          <Input
            v-model="email"
            class="flex-grow"
            label="Student email"
            type="email"
            required
          />
        </div>

        <div class="text-right">
          <Button class="mt-4" type="submit" label="Insert Student"></Button>
        </div>
      </form>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      email: '',
    }
  },

  methods: {
    async save() {
      await this.$store.dispatch('admin/students/insert', this.email)
    },
  },
})
</script>
