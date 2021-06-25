<template>
  <div class="max-w-screen-md mx-auto p-4 md:px-12">
    <div class="flex font-ember text-sm text-gray-500">
      <div class="w-16">Curso:</div>
      <nuxt-link class="text-blueaws" :to="`/students/courses/${course.id}`">
        {{ course.title }}
      </nuxt-link>
    </div>
    <div class="flex font-ember text-sm mb-4 text-gray-500">
      <div class="w-16">Módulo:</div>
      <div>
        {{ module.title }}
      </div>
    </div>
    <div class="text-2xl font-ember">
      Aula {{ position }}: {{ lesson.title }}
    </div>
    <div
      v-if="lesson.duration > 0"
      class="text-sm font-ember text-gray-600 font-light"
    >
      Esta aula dura até {{ lesson.duration }} minutos
    </div>
    <div class="mt-2 font-ember font-light">{{ lesson.description }}</div>

    <ContainerSlot
      title="Recursos"
      subtitle="Recursos utilizados nesta aula"
      class="font-ember mt-8"
    >
      <div>
        <div v-for="resource in lesson.resources" :key="resource.id">
          <ResourceInfo
            class="m-1"
            :label="resource.name"
            :type="resource.type"
            :description="resource.description"
            :to="resource.url"
            @click="clicked(resource.id)"
          />
        </div>
      </div>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, Module, Lesson } from '@/types'

interface ResponseData {
  lesson: Partial<Lesson>
  module: Partial<Module>
  course: Partial<Course>
  position: number
}

export default Vue.extend({
  data() {
    const response: ResponseData = {
      course: {},
      lesson: {},
      module: {},
      position: 0,
    }
    return {
      response,
    }
  },

  async fetch() {
    try {
      const { id, lid } = this.$route.params
      this.response = await this.$axios.$get(
        `/students/courses/${id}/lessons/${lid}`
      )
    } catch (error) {
      if (error.response.status === 404) {
        this.$nuxt.error({
          statusCode: 404,
          message:
            'Lesson not found or student do not have access to this content',
          path: '/students',
        })
      } else {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: error.response.data.message,
        })
      }
    }
  },

  computed: {
    course(): Partial<Course> {
      return this.response.course
    },

    module(): Partial<Module> {
      return this.response.module
    },

    lesson(): Partial<Lesson> {
      return this.response.lesson
    },

    position(): number {
      return this.response.position
    },
  },

  methods: {
    async clicked(resource: string) {
      try {
        await this.$axios.post(`/students/resources/${resource}/click`)
      } catch (error) {
        this.$store.commit('SET_ERROR', error)
      }
    },
  },
})
</script>
