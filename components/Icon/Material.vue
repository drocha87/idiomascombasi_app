<template>
  <span :class="`material-icons md-size-${size} text-${color}`">
    {{ name }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: { type: String, required: true },
    size: { type: String, default: '24' },
    color: { type: String, default: 'gray-600' },
  },
})
</script>

<style lang="postcss" scoped>
.material-icons.md-size-18 {
  font-size: 18px;
}
.material-icons.md-size-24 {
  font-size: 24px;
}
.material-icons.md-size-36 {
  font-size: 36px;
}
.material-icons.md-size-48 {
  font-size: 48px;
}
</style>
