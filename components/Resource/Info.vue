<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <a v-if="hasUrl" v-bind="$attrs" :href="to" target="'_blank'">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ label }}</div>
        <div class="uppercase">{{ type }}</div>
      </div>
      <div v-if="description !== ''" class="font-ember mt-1 text-gray-700">
        {{ description }}
      </div>
    </a>
    <span v-else v-bind="$attrs">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ label }}</div>
        <div class="uppercase">{{ type }}</div>
      </div>
      <div v-if="description !== ''" class="font-ember mt-1 text-gray-700">
        {{ description }}
      </div>
    </span>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,

  props: {
    label: { type: String, required: true },
    type: { type: String, default: 'url' },
    description: { type: String, default: '' },
    to: { type: String, required: true },
  },

  computed: {
    hasUrl(): boolean {
      return this.to && this.to.length > 0
    },
  },
})
</script>
