<template>
  <div class="border shadow-sm">
    <div class="py-2 px-4 border-b font-ember bg-gray-100">
      <div class="text-lg">
        {{ title }}
      </div>
      <div v-if="subtitle !== ''" class="text-xs text-gray-600">
        {{ subtitle }}
      </div>
    </div>

    <div class="p-4 bg-white">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
  },
})
</script>
