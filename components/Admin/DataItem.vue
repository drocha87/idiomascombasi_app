<template>
  <div
    class="flex items-center p-2"
    :class="{
      'bg-gray-100': index % 2 === 0,
      'bg-gray-200': index % 2 !== 0,
    }"
  >
    <button type="button" class="bg-white rounded-full" @click="$emit('up')">
      <IconExpandLess></IconExpandLess>
    </button>
    <button
      type="button"
      class="bg-white rounded-full ml-2"
      @click="$emit('down')"
    >
      <IconExpandMore></IconExpandMore>
    </button>

    <div class="ml-6 flex-grow">
      {{ label }}
    </div>

    <button
      type="button"
      class="text-xs px-4"
      :class="{
        'text-blue-500': !released,
        'text-yellow-500': released,
      }"
      @click="$emit('toggle-release')"
    >
      {{ released ? 'Unrelease' : 'Release' }}
    </button>

    <button
      type="button"
      class="text-xs text-red-500 px-4"
      @click="$emit('remove')"
    >
      Remove
    </button>
    <nuxt-link type="button" class="text-xs text-green-800 px-4" :to="visit">
      Visit
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: { type: String, required: true },
    visit: { type: String, required: true },
    index: { type: Number, required: true },
    released: { type: Boolean, default: false },
  },
})
</script>

<style lang="postcss" scoped>
button {
  @apply focus:outline-none;
}
</style>
