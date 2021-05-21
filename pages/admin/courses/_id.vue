<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header :id="course.id || ''" title="Course Editor" />

    <div v-if="course.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="course.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="course.updated_at" />
      </div>
    </div>

    <div class="mt-8">
      <div
        v-if="!visible"
        class="border border-green-500 border-l-8 bg-green-50 p-4 flex"
      >
        <div class="text-sm flex-grow">
          Release Course, remember that releasing your course will make it
          visible in students campus zone
        </div>
        <Button
          label="Release"
          small
          bg-color="green"
          @click="release()"
        ></Button>
      </div>
      <div v-else class="border border-gray-500 border-l-8 bg-gray-50 p-4 flex">
        <div class="text-sm flex-grow">
          Unrelease Course, REMOVING its visibility in campus
        </div>
        <Button
          label="Unrelease"
          small
          bg-color="red"
          @click="unrelease()"
        ></Button>
      </div>

      <form class="mt-8" @submit.prevent="updateHeader">
        <div class="flex justify-between">
          <Input
            v-model.trim="title"
            class="w-full"
            label="Title"
            type="text"
            required
          />

          <Select
            v-model="course.language"
            class="ml-4"
            label="Language"
            disabled
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="portuguese">Portuguese</option>
          </Select>

          <Select v-model="course.kind" class="ml-4" label="Kind" disabled>
            <option value="recorded">Recorded</option>
            <option value="live">Live</option>
            <option value="mixed">Mixed</option>
          </Select>
        </div>

        <div class="flex items-end mt-4">
          <Input
            v-model.trim="image"
            class="flex-grow"
            label="Image"
            type="url"
          />
          <!-- <Input
            v-model="course.author"
            class="flex-grow mx-4"
            label="Author"
            type="text"
            required
          /> -->
          <Input
            v-model="expiresAt"
            class="ml-4"
            label="Expires At"
            hint="If the course should not expire, leave this field without date"
            type="date"
          />
        </div>

        <Textarea
          v-model.trim="short_description"
          class="mt-4"
          label="Short Description"
          hint="You can use html tags to style the text"
          required
        />

        <div class="flex justify-between text-right mt-4">
          <Button
            type="button"
            label="Remove Course"
            small
            bg-color="red"
            @click="removeCourse()"
          >
          </Button>
          <Button type="submit" label="Update" small> </Button>
        </div>
      </form>

      <form @submit.prevent="updateBody">
        <div class="p-4 bg-gray-50 mt-4">
          <div class="text-sm text-gray-500">Description preview</div>
          <vue-markdown emoji html :source="description"> </vue-markdown>
          <!-- <div v-dompurify-html="description" class="text-sm mt-2"></div> -->
        </div>

        <Textarea
          v-model.trim="description"
          class="mt-4"
          label="Description"
          hint="You can use html tags to style the text"
          required
        />

        <Textarea
          v-model.trim="wywl"
          class="mt-4"
          label="What you'll learn"
          hint="You can split your text by paragraphs if you let an empty line between them"
        />

        <Textarea
          v-model.trim="requiriments"
          class="mt-4"
          label="Requirements"
          hint="You can split your text by paragraphs if you let an empty line between them"
        />

        <div class="text-right mt-4">
          <Button type="submit" label="Update" small> </Button>
        </div>
      </form>

      <!-- <div class="flex items-center mt-4 bg-gray-100 p-2">
        <div>Show your course on campus</div>
        <input
          type="checkbox"
          class="w-4 h-4 ml-8"
          :checked="visible"
          @click="visible = !visible"
        />
      </div> -->

      <div class="border p-4 mt-8">
        <TitleSmall>Modules</TitleSmall>
        <div class="p-4">
          <div
            v-for="(mod, index) in mods"
            :key="mod"
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
                @click="moveModule('up', mod)"
              >
                <IconExpandLess></IconExpandLess>
              </button>
              <button
                type="button"
                class="focus:outline-none bg-white rounded-full ml-2"
                @click="moveModule('down', mod)"
              >
                <IconExpandMore></IconExpandMore>
              </button>
              <div class="ml-6 flex-grow">
                {{ moduleName(mod) }}
              </div>
              <button
                type="button"
                class="text-xs text-red-500 px-4"
                @click="removeModule(mod)"
              >
                Remove
              </button>
              <nuxt-link
                type="button"
                class="text-xs text-green-800 px-4"
                :to="`/admin/modules/${mod}`"
              >
                Visit
              </nuxt-link>
            </div>
          </div>

          <div
            v-if="mods.length === 0"
            class="text-sm text-center text-gray-600"
          >
            This course actually don't have any modules, you should start adding
            modules to this course.
          </div>
        </div>
      </div>

      <div class="p-4 border mt-4">
        <TitleSmall>Available Modules</TitleSmall>
        <p class="mb-4 text-xs text-gray-700">
          To add a module into a course, just click in the Add button in front
          of the module. Remember that you <strong>DON'T</strong> need to save
          the course after add the module, since it will be saved automatically
        </p>
        <div class="p-4">
          <div
            v-for="(mod, index) in availableMods"
            :key="mod.id"
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
                {{ mod.title }}
              </div>
              <button
                type="button"
                class="text-xs text-red-500 px-4 font-bold text-blue-900"
                @click="addModule(mod.id)"
              >
                Add
              </button>
              <nuxt-link
                type="button"
                class="text-xs text-green-800 px-4"
                :to="`/admin/modules/${mod.id}`"
              >
                Visit
              </nuxt-link>
            </div>
          </div>

          <div
            v-if="availableMods.length === 0"
            class="text-sm text-center text-gray-600"
          >
            You don't have any modules to add to this course,
            <nuxt-link class="underline" to="/admin/modules/new">
              click here
            </nuxt-link>
            and create your first module compatible with this course
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
import { Course, Module } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    return {
      toggle: true,
    }
  },

  async fetch() {
    try {
      const { id } = this.$route.params
      await this.$store.dispatch('courses/fetchCourse', id)
      await this.$store.dispatch('modules/fetchModules')
    } catch (error) {
      alert(
        `Error: ${
          error.message || error.data?.message || error.data?.response?.message
        }`
      )
    }
  },

  computed: {
    allMods(): Module[] {
      return this.$store.getters['modules/modules']
    },

    course(): Course {
      return this.$store.getters['courses/currentCourse']
    },

    title: {
      get(): string {
        return this.course.title
      },
      set(value: string): void {
        this.$store.commit('courses/SET_COURSE_TITLE', value)
      },
    },

    image: {
      get(): string {
        return this.course.image
      },
      set(value: string): void {
        this.$store.commit('courses/SET_COURSE_IMAGE', value)
      },
    },

    short_description: {
      get(): string {
        return this.course.short_description
      },
      set(value: string): void {
        this.$store.commit('courses/SET_COURSE_SHORT_DESCRIPTION', value)
      },
    },

    description: {
      get(): string {
        return this.course.description
      },
      set(value: string): void {
        this.$store.commit('courses/SET_COURSE_DESCRIPTION', value)
      },
    },

    wywl: {
      get(): string {
        return this.course.wywl
      },
      set(value: string): void {
        this.$store.commit('courses/SET_COURSE_WYWL', value)
      },
    },

    requiriments: {
      get(): string {
        return this.course.requiriments
      },
      set(value: string): void {
        this.$store.commit('courses/SET_COURSE_REQUIRIMENTS', value)
      },
    },

    expiresAt: {
      get(): string {
        const date = this.course.expires_at || ''
        return date.split('T')[0]
      },
      set(value: string): void {
        this.$store.commit('courses/SET_COURSE_EXPIRESAT', value)
      },
    },

    visible(): boolean {
      return this.course.released
    },

    mods(): string[] {
      if (this.course.modules) {
        return this.course.modules
      }
      return []
    },

    availableMods(): Module[] {
      const courseMods = this.course.modules
      return this.allMods.filter((l: Module) => {
        let display = true
        if (courseMods?.includes(l.id!)) {
          display = false
        }
        return l.language === this.course.language && display
      })
    },
  },

  methods: {
    async moveModule(direction: string, id: string) {
      try {
        await this.$axios.$patch(
          `courses/${this.course.id}/module/${id}/${direction}`
        )
        await this.$store.dispatch('courses/fetchCourse', this.course.id)
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

    async removeModule(id: string) {
      try {
        await this.$axios.$delete(`courses/${this.course.id}/module/${id}`)
        await this.$store.dispatch('courses/fetchCourse', this.course.id)
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

    async addModule(id: string) {
      try {
        await this.$axios.$put(`courses/${this.course.id}/module/${id}`)
        await this.$store.dispatch('courses/fetchCourse', this.course.id)
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

    async removeCourse() {
      try {
        await this.$store.dispatch('courses/removeCourse')
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

    moduleName(id: string): string {
      const mod = this.allMods.find((lesson: any) => {
        return lesson.id === id
      })
      if (mod) {
        return mod.title
      }
      return 'undefined'
    },

    async updateHeader() {
      try {
        await this.$store.dispatch('courses/updateHeader')
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

    async updateBody() {
      try {
        await this.$store.dispatch('courses/updateBody')
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

    async release() {
      try {
        await this.$store.dispatch('courses/release')
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

    async unrelease() {
      try {
        await this.$store.dispatch('courses/unrelease')
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
