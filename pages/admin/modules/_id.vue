<template>
  <div>
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
      <form @submit.prevent="$store.dispatch('admin/modules/updateHeader')">
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
        <div class="flex justify-between text-right mt-4">
          <Button
            type="button"
            label="Remove Module"
            small
            bg-color="red"
            @click="$store.dispatch('admin/modules/removeModule')"
          >
          </Button>
          <Button type="submit" label="Update"> </Button>
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
                @click="
                  $store.dispatch('admin/modules/moveLesson', {
                    direction: 'up',
                    id: lesson,
                  })
                "
              >
                <IconExpandLess></IconExpandLess>
              </button>
              <button
                type="button"
                class="focus:outline-none bg-white rounded-full ml-2"
                @click="
                  $store.dispatch('admin/modules/moveLesson', {
                    direction: 'down',
                    id: lesson,
                  })
                "
              >
                <IconExpandMore></IconExpandMore>
              </button>
              <div class="ml-6 flex-grow">
                {{ lessonName(lesson) }}
              </div>
              <button
                type="button"
                class="text-xs text-red-500 px-4"
                @click="$store.dispatch('admin/modules/removeLesson', lesson)"
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
                @click="$store.dispatch('admin/modules/addLesson', lesson.id)"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  fetchOnServer: false,

  async fetch() {
    const { id } = this.$route.params
    await this.$store.dispatch('admin/modules/fetchModule', id)
    await this.$store.dispatch('admin/lessons/fetchLessons')
  },

  computed: {
    mod() {
      return this.$store.getters['admin/modules/currentModule']
    },

    allLessons(): any[] {
      return this.$store.getters['admin/lessons/lessons']
    },

    title: {
      get(): string {
        return this.mod.title
      },
      set(value: string): void {
        this.$store.commit('admin/modules/SET_MODULE_TITLE', value)
      },
    },

    description: {
      get(): string {
        return this.mod.description
      },
      set(value: string): void {
        this.$store.commit('admin/modules/SET_MODULE_DESCRIPTION', value)
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
      // TODO: use `some` method in modLessons to check if the lesson is available
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
    lessonName(id: string): string {
      return this.$store.getters['admin/lessons/lessonNameById'](id)
    },
  },
})
</script>
