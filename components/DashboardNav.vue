<template>
  <nav class="block z-50 w-screen h-12 bg-white border-b">
    <div class="flex items-center justify-between h-12 px-4 md:px-24">
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
        <nuxt-link to="/students">
          <h4>Campus ICB</h4>
        </nuxt-link>
      </div>

      <!-- settings button -->
      <div class="flex font-ember">
        <div class="hidden md:block text-gray-500">
          <StudentNickname v-if="student && student.id" :student="student" />
        </div>
        <nuxt-link to="/students/settings">
          <IconSettings class="ml-2 mr-4" />
        </nuxt-link>
        <button @click="logout">Logout</button>
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

  computed: {
    student(): any {
      return this.$auth.user
    },
  },

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
