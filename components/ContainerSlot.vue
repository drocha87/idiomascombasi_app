<template>
  <div class="border shadow-sm">
    <div class="py-2 px-4 border-b font-ember bg-gray-100">
      <div class="flex items-center justify-between">
        <div class="text-lg">
          {{ title }}
        </div>
        <slot name="top-action" />
      </div>
      <div v-if="subtitle !== ''" class="text-xs text-gray-600">
        {{ subtitle }}
      </div>
    </div>
    <div class="bg-white" :class="{ 'p-0': noPadding, 'p-4': !noPadding }">
      <slot />
    </div>
    <div v-if="hasAction" class="p-4 flex justify-end">
      <slot class="pt-4" name="action" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    noPadding: { type: Boolean, default: false },
  },

  computed: {
    hasAction(): boolean {
      return !!this.$slots.action
    },
  },
})
</script>
