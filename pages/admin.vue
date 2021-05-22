<template>
  <div class="relative bg-fafa min-h-screen max-w-screen-lg mx-auto pb-32">
    <Info class="fixed top-0 left-0 w-full z-50" />
    <NuxtChild :class="{ 'mt-14': hasInfo }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'admin',
  // middleware: 'isadmin',
  computed: {
    hasInfo(): boolean {
      return this.$store.getters['info/hasInfo']
    },
  },
})
</script>
