<template>
  <a
    class="block border rounded p-2 text-sm font-medium"
    :href="to"
    target="_blank"
  >
    <div v-bind="$attrs">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ label }}</div>
      </div>
      <div class="text-gray-600 text-xs mt-1">
        {{ description }}
      </div>
    </div>
    <slot name="action"></slot>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    to: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, required: true },
  },

  computed: {},
})
</script>
