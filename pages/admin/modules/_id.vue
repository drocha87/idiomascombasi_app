<template>
  <div>
    <h1 class="text-4xl font-ember font-light">{{ mod.title }}</h1>

    <div v-if="mod.id" class="flex justify-between">
      <div class="text-xs text-gray-700 mt-2">
        Created at <Date :date="mod.created_at" />
      </div>
      <div class="text-xs text-gray-700 mt-2">
        Last update in <Date :date="mod.updated_at" />
      </div>
    </div>

    <ContainerSlot title="Module information" class="mt-8">
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
    </ContainerSlot>

    <ContainerSlot title="Lessons" class="mt-8">
      <div class="p-4">
        <div v-for="(lesson, index) in lessons" :key="lesson.lesson_id">
          <AdminDataItem
            :label="lessonName(lesson.lesson_id)"
            :index="index"
            :visit="`/admin/lessons/${lesson.lesson_id}`"
            :released="lesson.released"
            @toggle-release="
              $store.dispatch(
                'admin/modules/toggleLessonRelease',
                lesson.lesson_id
              )
            "
            @up="move('up', lesson.lesson_id)"
            @down="move('down', lesson.lesson_id)"
            @remove="
              $store.dispatch('admin/modules/removeLesson', lesson.lesson_id)
            "
          />
        </div>
        <div
          v-if="lessons.length === 0"
          class="text-sm text-center text-gray-600"
        >
          This module actually don't have any lesson, you should start adding
          lessons to this module.
        </div>
      </div>
    </ContainerSlot>

    <ContainerSlot title="Available Lessons" class="mt-8">
      <p class="mb-4 text-xs text-gray-700">
        To add a lesson into a module, just click in the Add button in front of
        the lesson. Remember that you <strong>DON'T</strong> need to save the
        module after add the lesson, since it will be saved automatically
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
    </ContainerSlot>
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
      return this.allLessons.filter((l: any) => {
        return (
          l.language === this.mod.language &&
          !this.mod.lessons?.some((ll: any) => ll.lesson_id === l.id)
        )
      })
    },
  },

  methods: {
    async move(direction: string, id: string) {
      await this.$store.dispatch('admin/modules/moveLesson', {
        direction,
        id,
      })
    },

    lessonName(id: string): string {
      return this.$store.getters['admin/lessons/lessonNameById'](id)
    },
  },
})
</script>
