<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <div v-bind="$attrs">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ answer.text }}</div>
      </div>
    </div>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Answer } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    answer: { type: Object as () => Answer, required: true },
  },

  computed: {},
})
</script>
