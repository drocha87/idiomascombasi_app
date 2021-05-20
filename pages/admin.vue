<template>
  <div class="bg-fafa">
    <NuxtChild />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'admin',
  // middleware: 'isadmin',
})
</script>
