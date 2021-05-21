<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Module Creator" />

    <div class="mt-8">
      <form @submit.prevent="save">
        <div class="flex justify-between">
          <Input
            v-model="title"
            class="w-full"
            label="Title"
            type="text"
            required
          />

          <Select v-model="language" class="ml-4" label="Language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>
        </div>

        <Textarea
          v-model="description"
          class="mt-4"
          label="Description"
          required
        />

        <div class="text-right">
          <Button class="mt-4" type="submit" label="Save Module"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Module {
  title: string
  language: string
  description: string
}

export default Vue.extend({
  data() {
    return {
      title: '',
      language: 'english',
      description: '',
    }
  },

  methods: {
    async save() {
      try {
        const data: Module = {
          title: this.title,
          language: this.language,
          description: this.description,
        }
        // TODO: push to modules after insert
        await this.$axios.$post('modules/', data)
        this.$router.push({ path: '/admin' })
      } catch (error) {
        alert(
          `Error: ${
            error.message ||
            error.response?.data?.message ||
            error.data?.message ||
            error.data?.response?.message
          }`
        )
      }
    },
  },
})
</script>
