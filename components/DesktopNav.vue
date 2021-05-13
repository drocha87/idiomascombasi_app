<template>
  <nav class="fixed z-50 w-screen h-16 bg-white font-antonio border-b">
    <!-- overlay -->

    <div class="flex items-center justify-between h-16 px-24">
      <div
        class="
          text-xl
          font-bold
          tracking-widest
          uppercase
          select-none
          font-montserrat
        "
      >
        <h4>Campus ICB</h4>
      </div>

      <!-- settings button -->
      <div>
        Diego Rocha
        <span class="material-icons-outlined"> settings </span>
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
