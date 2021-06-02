<template>
  <div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>
