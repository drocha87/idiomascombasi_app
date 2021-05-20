<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header :id="mod.id || ''" title="Module Editor" />

    <div v-if="mod.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="mod.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="mod.updated_at" />
      </div>
    </div>
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

          <Select v-model="mod.language" class="ml-4" label="Language" disabled>
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
        <div class="text-right mt-4">
          <Button type="submit" label="Save Module"> </Button>
        </div>
      </form>

      <div class="border p-4 mt-8">
        <TitleSmall>Lessons</TitleSmall>
        <div class="p-4">
          <div
            v-for="(lesson, index) in lessons"
            :key="lesson"
            type="button"
            class="text-sm block"
          >
            <div
              class="flex p-2"
              :class="{
                'bg-gray-100': index % 2 === 0,
                'bg-gray-200': index % 2 !== 0,
              }"
            >
              <button
                type="button"
                class="focus:outline-none bg-white rounded-full"
                @click="lessonUp(lesson)"
              >
                <IconExpandLess></IconExpandLess>
              </button>
              <button
                type="button"
                class="focus:outline-none bg-white rounded-full ml-2"
                @click="lessonDown(lesson)"
              >
                <IconExpandMore></IconExpandMore>
              </button>
              <div class="ml-6 flex-grow">
                {{ lessonName(lesson) }}
              </div>
              <button
                type="button"
                class="text-xs text-red-500 px-4"
                @click="removeLesson(lesson)"
              >
                Remove
              </button>
              <nuxt-link
                class="text-xs text-green-800 px-4"
                :to="`/admin/lessons/${lesson}`"
              >
                Visit
              </nuxt-link>
            </div>
          </div>

          <div
            v-if="lessons.length === 0"
            class="text-sm text-center text-gray-600"
          >
            This module actually don't have any lesson, you should start adding
            lessons to this module.
          </div>
        </div>
      </div>

      <div class="p-4 border mt-4">
        <TitleSmall>Available Lessons</TitleSmall>
        <p class="mb-4 text-xs text-gray-700">
          To add a lesson into a module, just click in the Add button in front
          of the lesson. Remember that you <strong>DON'T</strong> need to save
          the module after add the lesson, since it will be saved automatically
        </p>
        <div class="p-4">
          <div
            v-for="(lesson, index) in availableLessons"
            :key="lesson.id"
            type="button"
            class="text-sm block"
          >
            <div
              class="flex p-2"
              :class="{
                'bg-gray-100': index % 2 === 0,
                'bg-gray-200': index % 2 !== 0,
              }"
            >
              <div class="ml-4 flex-grow">
                {{ lesson.title }}
              </div>
              <button
                type="button"
                class="text-xs text-red-500 px-4 font-bold text-blue-900"
                @click="addLesson(lesson.id)"
              >
                Add
              </button>
              <nuxt-link
                class="text-xs text-green-800 px-4"
                :to="`/admin/lessons/${lesson.id}`"
              >
                Visit
              </nuxt-link>
            </div>
          </div>

          <div
            v-if="availableLessons.length === 0"
            class="text-sm text-center text-gray-600"
          >
            You don't have any lessons to add to this module,
            <nuxt-link class="underline" to="/admin/lessons/new">
              click here
            </nuxt-link>
            and create your first lesson compatible with this module
          </div>
        </div>

        <!-- <button
            v-for="lesson in availableLessons"
            :key="lesson.id"
            type="button"
            class="text-sm block py-1 text-gray-800"
            @click="addLesson(lesson.id)"
          >
            {{ lesson.title }}
          </button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  fetchOnServer: false,
  data() {
    return {
      allLessons: [],
    }
  },

  async fetch() {
    try {
      const { id } = this.$route.params
      await this.$store.dispatch('modules/fetchModule', id)
      const lessons = await this.$axios.$get('lessons/')
      this.allLessons = lessons
    } catch (error) {
      alert(
        `Error: ${
          error.message || error.data?.message || error.data?.response?.message
        }`
      )
    }
  },

  computed: {
    mod() {
      return this.$store.getters['modules/currentModule']
    },

    title: {
      get(): string {
        return this.mod.title
      },
      set(value: string): void {
        this.$store.commit('modules/SET_MODULE_TITLE', value)
      },
    },

    description: {
      get(): string {
        return this.mod.description
      },
      set(value: string): void {
        this.$store.commit('modules/SET_MODULE_DESCRIPTION', value)
      },
    },

    lessons(): any[] {
      if (this.mod.lessons) {
        return this.mod.lessons
      }
      return []
    },

    availableLessons(): any[] {
      const modLessons = this.mod.lessons
      return this.allLessons.filter((l: any) => {
        let display = true
        if (modLessons?.includes(l.id)) {
          display = false
        }
        return l.language === this.mod.language && display
      })
    },
  },

  methods: {
    async lessonUp(id: string) {
      try {
        await this.$axios.$patch(`modules/${this.mod.id}/lesson/${id}/up`)
        await this.$store.dispatch('modules/fetchModule', this.mod.id)
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

    async lessonDown(id: string) {
      try {
        await this.$axios.$patch(`modules/${this.mod.id}/lesson/${id}/down`)
        await this.$store.dispatch('modules/fetchModule', this.mod.id)
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

    async removeLesson(id: string) {
      try {
        await this.$axios.$delete(`modules/${this.mod.id}/lesson/${id}`)
        await this.$store.dispatch('modules/fetchModule', this.mod.id)
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

    async addLesson(id: string) {
      try {
        const { id: moduleID } = this.$route.params
        await this.$axios.$put(`modules/${this.mod.id}/lesson/${id}`)
        await this.$store.dispatch('modules/fetchModule', moduleID)

        // if (!this.mod.lessons) {
        //   this.mod.lessons = []
        // }
        // this.mod.lessons.push({ index: this.lessons.length, lesson_id: id })
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

    lessonName(id: string): string {
      const lesson: any = this.allLessons.find((lesson: any) => {
        return lesson.id === id
      })
      if (lesson) {
        return lesson.title
      }
      return 'undefined'
    },

    async save() {
      try {
        await this.$store.dispatch('modules/updateHeader')
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
