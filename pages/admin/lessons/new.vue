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

        <!-- <div class="border p-4 mt-4">
          <TitleSmall>Resources</TitleSmall>
          <div class="flex items-center mt-4">
            <Select v-model="resourceType" label="Resource Type">
              <option value="url">URL</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </Select>

            <Input
              v-model="resourceName"
              class="flex-grow ml-4"
              label="Name"
              type="text"
            />

            <Input
              v-model="resourceUrl"
              class="flex-grow ml-4"
              label="URL"
              type="text"
            />
          </div>
          <Textarea
            v-model="resourceDescription"
            label="Resource Description"
            class="mt-4"
          />
          <div class="text-right">
            <button
              type="button"
              class="border h-8 w-32 bg-purple-600 text-white font-bold"
              @click="addResource"
            >
              Add
            </button>
          </div>

          <div class="mt-4">
            <div
              v-for="(resource, index) in resources"
              :key="index"
              class="mt-2 text-sm"
            >
              <div class="flex">
                <div class="px-8 bg-gray-100 py-1 text-sm">
                  Type: {{ resource.type }}
                </div>
                <div class="px-8 bg-gray-200 py-1 text-sm">
                  Name: {{ resource.name }}
                </div>
                <div class="bg-gray-100 flex-grow py-1 px-2 text-sm">
                  Url: {{ resource.url }}
                </div>
                <div>
                  <button
                    type="button"
                    class="text-xs p-2 bg-red-500 text-white focus:outline-none"
                    @click="deleteResource(index)"
                  >
                    Delete Resource
                  </button>
                </div>
              </div>
              <div class="p-4 bg-gray-100 text-sm">
                {{ resource.description }}
              </div>
            </div>
          </div>
        </div> -->

        <div class="text-right">
          <button
            type="submit"
            class="border h-12 w-32 mt-8 bg-purple-600 text-white font-bold"
          >
            Save Lesson
          </button>
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
      duration: '0',
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
