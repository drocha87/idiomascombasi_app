<template>
  <div class="relative min-h-screen max-w-screen-lg mx-auto pb-32">
    <Info class="fixed top-0 left-0 w-full z-50" />

    <div
      class="
        fixed
        top-0
        left-0
        w-full
        z-40
        bg-gray-700
        h-8
        flex
        items-center
        px-12
        font-ember
      "
    >
      <div class="w-full flex items-center justify-between">
        <div>
          <nuxt-link class="text-white" to="/admin">ICB Admin</nuxt-link>
        </div>
        <div>
          <input
            class="px-2 text-white bg-gray-700 border text-sm"
            placeholder="Search services"
          />
        </div>
      </div>
    </div>

    <NuxtChild class="mt-20" :class="{ 'mt-14': hasInfo }" />
    <Footer class="absolute mt-10 md:mt-0 md:fixed md:bottom-0 md:left-0" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'admin',
  middleware: 'isadmin',

  computed: {
    hasInfo(): boolean {
      return this.$store.getters['info/hasInfo']
    },
  },
})
</script>
