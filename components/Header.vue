<template>
  <div
    class="
      relative
      h-32
      bg-purple-500
      text-white
      flex
      items-center
      justify-center
    "
  >
    <TitleMedium> {{ title }}</TitleMedium>
    <div v-if="id !== ''" class="absolute right-2 top-2 text-xs">
      {{ id }}
    </div>
    <nuxt-link
      class="
        absolute
        block
        left-4
        top-4
        bg-white
        text-purple-900
        px-2
        rounded-sm
        hover:bg-gray-100
      "
      to="/admin"
    >
      Home
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: { type: String, required: true },
    id: { type: String, default: '' },
  },
})
</script>
