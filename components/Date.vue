<template>
  <span>
    {{ formatedDate }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    date: { type: String, required: true },
  },

  computed: {
    formatedDate() {
      const d = this.date?.split('T')
      if (d.length < 2) {
        return 'invalid'
      }
      return d[0] + ' ' + d[1].substring(0, 5)
    },
  },
})
</script>
