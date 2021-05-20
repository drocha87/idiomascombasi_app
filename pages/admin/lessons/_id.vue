<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header :id="lesson.id || ''" title="Lesson Editor" />

    <div v-if="lesson.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="lesson.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="lesson.updated_at" />
      </div>
    </div>

    <div class="mt-8">
      <form @submit.prevent="updateHeader">
        <div class="flex justify-between items-end">
          <Input
            v-model.trim="title"
            class="w-full"
            label="Title"
            type="text"
            required
          />

          <Input
            v-model="duration"
            class="ml-4"
            label="Lesson Duration"
            hint="Defines the estimated lessons duration in minutes"
            type="number"
          />

          <Select
            v-model="lesson.language"
            class="ml-4"
            label="Language"
            disabled
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>
        </div>

        <Textarea
          v-model="description"
          class="mt-4"
          label="Description"
          hint="You can use html tags to style the text"
          required
        />

        <div class="flex justify-between mt-4">
          <Button
            type="button"
            label="Remove Lesson"
            small
            bg-color="red"
            @click="removeLesson()"
          >
          </Button>
          <Button type="submit" label="Update" small> </Button>
        </div>
      </form>

      <div class="border p-4 mt-4">
        <TitleSmall>Resources</TitleSmall>

        <form @submit.prevent="addResource">
          <div class="flex items-center mt-4">
            <Select v-model="resourceType" label="Resource Type">
              <option value="url">URL</option>
              <option value="pdf">PDF</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </Select>

            <Input
              v-model.trim="resourceName"
              class="flex-grow ml-4"
              label="Name"
              type="text"
              required
            />

            <Input
              v-model="resourceUrl"
              class="flex-grow ml-4"
              label="URL"
              type="url"
            />
          </div>
          <Textarea
            v-model="resourceDescription"
            label="Resource Description"
            class="mt-4"
          />
          <div class="text-right">
            <Button label="Add" small> </Button>
          </div>
        </form>

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
                  @click="deleteResource(resource.id)"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Resource } from '~/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      toggle: true,
      resourceType: 'url',
      resourceName: '',
      resourceUrl: '',
      resourceDescription: '',
    }
  },

  async fetch() {
    try {
      const { id } = this.$route.params
      await this.$store.dispatch('lessons/fetchLesson', id)
    } catch (error) {
      alert(
        `Error: ${
          error.message || error.data?.message || error.data?.response?.message
        }`
      )
    }
  },

  computed: {
    lesson() {
      return this.$store.getters['lessons/currentLesson']
    },

    title: {
      get(): string {
        return this.lesson.title
      },
      set(value: string): void {
        this.$store.commit('lessons/SET_LESSON_TITLE', value)
      },
    },

    duration: {
      get(): string {
        return this.lesson.duration
      },
      set(value: string): void {
        this.$store.commit('lessons/SET_LESSON_DURATION', value)
      },
    },

    description: {
      get(): string {
        return this.lesson.description
      },
      set(value: string): void {
        this.$store.commit('lessons/SET_LESSON_DESCRIPTION', value)
      },
    },

    resources(): Resource[] {
      if (this.lesson.resources) {
        return this.lesson.resources
      }
      return []
    },
  },

  methods: {
    async deleteResource(id: string) {
      try {
        await this.$store.dispatch('lessons/deleteResource', id)
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

    async addResource() {
      try {
        const resource: Resource = {
          type: this.resourceType,
          url: this.resourceUrl,
          name: this.resourceName,
          description: this.resourceDescription,
        }
        await this.$store.dispatch('lessons/addResource', resource)
        this.resourceType = 'url'
        this.resourceUrl = ''
        this.resourceName = ''
        this.resourceDescription = ''
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

    async updateHeader() {
      try {
        await this.$store.dispatch('lessons/updateHeader')
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

    async removeLesson() {
      try {
        await this.$store.dispatch('lessons/removeLesson')
        this.$router.push({ path: '/lessons' })
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
