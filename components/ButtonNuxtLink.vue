<template>
  <nuxt-link
    class="
      p-2
      w-32
      font-ember
      text-white text-center
      rounded
      focus:outline-none
    "
    :class="[
      {
        'text-sm': small,
      },
      `bg-${bgColor}-500`,
      `hover:bg-${bgColor}-700`,
    ]"
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
    small: { type: Boolean, default: false },
    bgColor: { type: String, default: 'purple' },
  },
})
</script>
