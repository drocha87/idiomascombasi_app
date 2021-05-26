<template>
  <nav class="w-full h-12 bg-white border-b">
    <div class="flex items-center justify-between h-12 px-4 md:px-24">
      <nuxt-link
        class="
          text-xl
          font-bold
          tracking-widest
          uppercase
          select-none
          font-montserrat
        "
        to="/"
      >
        <h4>Campus ICB</h4>
      </nuxt-link>

      <!-- settings button -->
      <div class="flex font-montserrat tracking-wider font-medium">
        <nuxt-link
          to="/login"
          class="py-2 px-4 hover:bg-gray-100 rounded-sm font-ember"
        >
          Login
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },

  computed: {},

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
})
</script>

<style lang="postcss" scoped>
.anime {
  animation: navLinkFade 0.3s ease forwards 0.2s;
}

@keyframes navLinkFade {
  0% {
    @apply opacity-0;
    transform: translateX(50px);
  }

  100% {
    @apply opacity-100;
    transform: translateX(0px);
  }
}
</style>
