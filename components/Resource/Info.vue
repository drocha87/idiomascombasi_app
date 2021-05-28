<template>
  <a
    class="
      flex
      items-center
      justify-between
      border
      rounded
      p-2
      text-xs text-blueaws
    "
    v-bind="$attrs"
    :href="to"
    target="_blank"
  >
    <div>{{ label }}</div>
    <div class="uppercase">{{ type }}</div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,

  props: {
    label: { type: String, required: true },
    type: { type: String, default: 'url' },
    to: { type: String, required: true },
  },
})
</script>
