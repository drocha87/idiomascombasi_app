<template>
  <span>{{ convertedLevel }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    level: { type: Number, required: true },
  },
  computed: {
    convertedLevel(): string {
      const l = this.level
      if (l > 0 && l <= 200) {
        return 'a1'
      } else if (l <= 400) {
        return 'a2'
      } else if (l <= 600) {
        return 'b1'
      } else if (l <= 800) {
        return 'b2'
      } else if (l <= 1000) {
        return 'c1'
      } else if (l <= 1200) {
        return 'c2'
      }
      return 'unknown'
    },
  },
})
</script>
