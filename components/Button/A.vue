<template>
  <a
    class="
      p-2
      px-4
      font-ember
      text-white text-center
      rounded
      focus:outline-none
      h-14
      md:h-10
    "
    :class="[
      {
        'text-sm': small,
      },
      `bg-${bgColor}-500`,
      `hover:bg-${bgColor}-700`,
    ]"
    style="min-width: 150px"
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ compLabel }}
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: { type: String, default: 'button' },
    small: { type: Boolean, default: false },
    bgColor: { type: String, default: 'purple' },
  },

  computed: {
    compLabel(): string {
      return `${this.label[0].toUpperCase()}${this.label.substring(1)}`
    },
  },
})
</script>
