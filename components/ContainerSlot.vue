<template>
  <div class="border shadow-sm">
    <div class="px-4 py-2 text-lg font-medium border-b bg-gray-100">
      {{ title }}
    </div>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: { type: String, required: true },
  },
})
</script>
