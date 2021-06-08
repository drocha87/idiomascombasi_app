<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <h1 class="text-4xl font-ember font-light">{{ lesson.title }}</h1>

    <div v-if="lesson.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="lesson.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="lesson.updated_at" />
      </div>
    </div>

    <ContainerSlot title="Lesson Information" class="mt-8">
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
    </ContainerSlot>

    <ContainerSlot title="Resources" class="mt-12">
      <form @submit.prevent="addResource">
        <div class="flex items-center mt-4">
          <Select v-model="resource.type" label="Type">
            <option value="url">URL</option>
            <option value="pdf">PDF</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </Select>

          <Select v-model="resource.expires_in" class="ml-2" label="Expires In">
            <option :value="0">Never</option>
            <option :value="24">1 Day</option>
            <option :value="48">2 Days</option>
            <option :value="72">3 Days</option>
            <option :value="120">5 Days</option>
            <option :value="240">10 Days</option>
          </Select>

          <Input
            v-model.trim="resource.name"
            class="flex-grow ml-4"
            label="Name"
            type="text"
            required
          />

          <Input
            v-model="resource.url"
            class="flex-grow ml-4"
            label="URL"
            type="url"
          />
        </div>

        <Textarea
          v-model="resource.description"
          label="Description"
          class="mt-4"
        />
        <div class="text-right">
          <Button label="Add" small> </Button>
        </div>
      </form>

      <div class="mt-4">
        <div
          v-for="(res, index) in resources"
          :key="index"
          class="mt-2 text-sm"
        >
          <ResourceInfo
            class="m-1"
            :label="res.name"
            :type="res.type"
            :description="res.description"
            :to="res.url"
          >
            <template #action>
              <div
                class="
                  flex
                  items-end
                  font-ember
                  text-xs text-gray-500
                  justify-between
                  mt-2
                "
              >
                <div class="flex-grow">{{ res.url }}</div>
                <ExpiresIn
                  v-if="res.expires_in > 0"
                  class="mr-8"
                  :expires-in="res.expires_in"
                  :created-at="res.created_at"
                />
                <button
                  type="button"
                  class="text-red-500 focus:outline-none"
                  @click="deleteResource(res.id)"
                >
                  Delete
                </button>
              </div>
            </template>
          </ResourceInfo>
          <!-- <div class="flex">
              <div class="px-8 bg-gray-100 py-1 text-sm">
                Type: {{ res.type }}
              </div>
              <div class="px-8 bg-gray-200 py-1 text-sm">
                {{ res.name }}
              </div>
              <div class="bg-gray-100 flex-grow py-1 px-2 text-sm">
                Url: {{ res.url }}
              </div>
              <div>
                <button
                  type="button"
                  class="text-xs p-2 bg-red-500 text-white focus:outline-none"
                  @click="deleteResource(res.id)"
                >
                  Delete Resource
                </button>
              </div>
            </div>
            <div class="p-4 bg-gray-100 text-sm">
              {{ res.description }}
            </div> -->
        </div>
      </div>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Resource } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    const resource: Resource = {
      type: 'url',
      url: '',
      name: '',
      description: '',
      expires_in: 0,
    }

    return {
      resource,
    }
  },

  async fetch() {
    const { id } = this.$route.params
    await this.$store.dispatch('admin/lessons/fetchLesson', id)
  },

  computed: {
    lesson() {
      return this.$store.getters['admin/lessons/currentLesson']
    },

    title: {
      get(): string {
        return this.lesson.title
      },
      set(value: string): void {
        this.$store.commit('admin/lessons/SET_LESSON_TITLE', value)
      },
    },

    duration: {
      get(): string {
        return this.lesson.duration
      },
      set(value: string): void {
        this.$store.commit('admin/lessons/SET_LESSON_DURATION', value)
      },
    },

    description: {
      get(): string {
        return this.lesson.description
      },
      set(value: string): void {
        this.$store.commit('admin/lessons/SET_LESSON_DESCRIPTION', value)
      },
    },

    resources(): Resource[] {
      return this.lesson?.resources || []
    },
  },

  methods: {
    async deleteResource(id: string) {
      await this.$store.dispatch('admin/lessons/deleteResource', id)
    },

    async addResource() {
      await this.$store.dispatch('admin/lessons/addResource', this.resource)
      this.resource.type = 'url'
      this.resource.url = ''
      this.resource.name = ''
      this.resource.description = ''
    },

    async updateHeader() {
      await this.$store.dispatch('admin/lessons/updateHeader')
    },

    async removeLesson() {
      await this.$store.dispatch('admin/lessons/removeLesson')
    },
  },
})
</script>
