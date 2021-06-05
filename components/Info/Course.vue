<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <nuxt-link v-bind="$attrs" :to="`/admin/courses/${course.id}`">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ course.title }}</div>
        <div class="uppercase">
          {{ course.language }}
        </div>
      </div>
    </nuxt-link>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    course: { type: Object as () => Course, required: true },
  },

  computed: {},
})
</script>
