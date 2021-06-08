<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <nuxt-link v-bind="$attrs" :to="`/admin/lessons/${lesson.id}`">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ lesson.title }}</div>
        <div class="uppercase">
          {{ lesson.language }}
        </div>
      </div>
    </nuxt-link>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Lesson } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    lesson: { type: Object as () => Lesson, required: true },
  },

  computed: {},
})
</script>
