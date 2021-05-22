<template>
  <div
    v-if="hasInfo"
    class="
      p-4
      h-14
      border border-l-8
      flex
      justify-between
      items-center
      font-ember
    "
    :class="{
      'border-blue-500 bg-blue-50': infoType === 'info',
      'border-yellow-500 bg-yellow-50': infoType === 'warning',
      'border-red-500 bg-red-50': infoType === 'error',
    }"
  >
    {{ message }}
    <button
      class="text-sm font-medium"
      :class="{
        'text-blue-500': infoType === 'info',
        'text-yellow-500': infoType === 'warning',
        'text-red-500': infoType === 'error',
      }"
      @click="$store.commit('info/CLEAN_INFO')"
    >
      Close
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    infoType(): string {
      return this.$store.getters['info/getType']
    },

    message(): String {
      return this.$store.getters['info/getMessage']
    },

    hasInfo(): boolean {
      return this.$store.getters['info/hasInfo']
    },
  },
})
</script>
