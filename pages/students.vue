<template>
  <div>
    <DashboardNav></DashboardNav>
    <div class="max-w-screen-xl mx-auto">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'empty',
  middleware: 'auth',
})
</script>
