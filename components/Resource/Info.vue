<template>
  <nuxt-link
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
    :to="to"
  >
    <div>{{ label }}</div>
    <div>{{ quantity }}</div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,

  props: {
    label: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    to: { type: String, required: true },
  },
})
</script>
