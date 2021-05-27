<template>
  <div class="max-w-screen-md mx-auto p-4 md:px-12">Lesson</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Lesson } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  data() {
    const lesson: Partial<Lesson> = {}
    return {
      lesson,
    }
  },

  fetch() {},

  computed: {},
})
</script>
