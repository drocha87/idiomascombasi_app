<template>
  <label v-bind="$attrs" class="text-sm pb-1"><slot /></label>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,
})
</script>
