<template>
  <footer
    class="
      bg-fafa
      w-full
      border-t
      text-gray-900 text-xs
      font-ember font-light
      tracking-wide
    "
  >
    <div class="hidden md:flex h-8 items-center px-8">
      <div class="flex-grow">Feedback</div>
      <div>© 2021, Basilia Santiago. All rights reserved.</div>
      <div class="ml-8">
        <a href="https://idiomascombasi.com.br/legal">Terms of use</a>
      </div>

      <nuxt-link
        v-if="isAdmin && /^\/admin.*/.test($route.fullPath)"
        class="ml-4 font-medium"
        to="/students"
      >
        Student
      </nuxt-link>
      <nuxt-link v-else-if="isAdmin" class="ml-4 font-medium" to="/admin">
        Admin
      </nuxt-link>
    </div>
    <div
      class="
        md:hidden
        w-full
        h-16
        flex flex-col
        items-center
        justify-around
        px-8
      "
    >
      <div class="flex items-center justify-around w-full max-w-1/2">
        <div>Feedback</div>
        <div class="text-gray-300">|</div>
        <div>
          <a href="https://idiomascombasi.com.br/legal">Terms of use</a>
        </div>
      </div>
      <div>© 2021, Basilia Santiago. All rights reserved.</div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    isAdmin(): boolean {
      return this.$auth.hasScope('admin')
    },
  },
})
</script>
