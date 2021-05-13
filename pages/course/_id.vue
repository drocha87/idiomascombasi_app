<template>
  <div>Course {{ id }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    id(): string {
      return this.$route.params.id
    },
  },
})
</script>
