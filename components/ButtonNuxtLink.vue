<template>
  <nuxt-link
    class="
      p-2
      min-w-32
      text-white
      bg-purple-500
      capitalize
      text-center
      rounded
      hover:bg-purple-700
    "
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ label }}
  </nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: { type: String, default: 'button' },
  },
})
</script>
