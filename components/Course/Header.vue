<template>
  <div class="flex flex-col md:flex-row items-start">
    <div class="mt-2 md:mt-0 md:pr-8 order-2 md:order-1 p-4">
      <h6 class="font-ember text-gold capitalize">{{ course.language }}</h6>
      <h3 class="text-3xl font-ember font-medium">{{ course.title }}</h3>
      <p class="mt-4 font-ember font-light">{{ course.short_description }}</p>
      <slot name="action" :item="course"> </slot>
    </div>
    <div
      v-if="course.image && course.image !== ''"
      class="md:max-w-1/4 order-1 md:order-2"
    >
      <img class="object-cover" :src="course.image" alt="idiomascombasi" />
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
})
</script>
