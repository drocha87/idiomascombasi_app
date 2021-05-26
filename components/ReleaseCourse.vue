<template>
  <div v-if="course.id">
    <div
      v-if="!course.released"
      class="border border-green-500 border-l-8 bg-green-50 p-4 flex"
    >
      <div class="text-sm flex-grow">
        Release Course, remember that releasing your course will make it visible
        in students campus zone
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  props: {
    course: { type: Object as () => Course, required: true },
  },

  methods: {
    async release() {
      await this.$store.dispatch('admin/courses/release')
    },

    async unrelease() {
      await this.$store.dispatch('admin/courses/unrelease')
    },
  },
})
</script>
