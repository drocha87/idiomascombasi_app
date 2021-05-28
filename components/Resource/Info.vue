<template>
  <a
    class="block border rounded p-2 text-xs"
    v-bind="$attrs"
    :href="to"
    target="_blank"
  >
    <div class="flex items-center justify-between text-blueaws">
      <div>{{ label }}</div>
      <div class="uppercase">{{ type }}</div>
    </div>
    <div v-if="description !== ''" class="font-ember mt-1 text-gray-700">
      {{ description }}
    </div>
  </a>
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
})
</script>
