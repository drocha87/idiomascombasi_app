<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Lesson Creator" />

    <div class="mt-8">
      <form @submit.prevent="save">
        <div class="flex justify-between">
          <Input
            v-model="title"
            class="w-1/2"
            label="Title"
            type="text"
            required
          />

          <Select v-model="language" label="Language">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>

          <Select v-model="kind" label="Kind">
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
          v-model="description"
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
import { Lesson, Resource } from '@/types'

export default Vue.extend({
  data() {
    const resources: Resource[] = []

    return {
      title: '',
      kind: 'regular',
      language: 'english',
      duration: '60',
      description: '',
      resourceType: 'url',
      resourceUrl: '',
      resourceName: '',
      resourceDescription: '',
      resources,
    }
  },

  methods: {
    addResource() {
      if (this.resourceName.length === 0 || this.resourceUrl.length === 0) {
        alert(`Cannot add resource with missing fields name or url.`)
        return
      }
      const resource: Resource = {
        type: this.resourceType,
        url: this.resourceUrl,
        name: this.resourceName,
        description: this.resourceDescription,
      }

      this.resources.push(resource)
      this.resourceType = 'url'
      this.resourceUrl = ''
      this.resourceName = ''
      this.resourceDescription = ''
    },

    deleteResource(index: number) {
      this.resources.splice(index, 1)
    },

    async save() {
      try {
        const data: Partial<Lesson> = {
          title: this.title,
          language: this.language,
          kind: this.kind,
          duration: parseInt(this.duration),
          description: this.description,
          resources: this.resources,
        }
        // TODO: redirect to lesson after insert
        await this.$axios.$post('lessons/', data)
        this.$router.push({ path: '/admin' })
      } catch (error) {
        alert(
          `Error: ${
            error.message ||
            error.data?.message ||
            error.data?.response?.message
          }`
        )
      }
    },
  },
})
</script>
