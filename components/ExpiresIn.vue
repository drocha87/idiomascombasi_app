<template>
  <div>
    <div v-if="!expired">Expires in: {{ formatDate }}</div>
    <div v-else>Resource Expired</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    expiresIn: { type: Number, required: true },
    createdAt: { type: String, required: true },
  },

  computed: {
    date(): Date {
      const date = new Date(this.createdAt)
      date.setHours(date.getHours() + this.expiresIn)
      return date
    },

    formatDate(): string {
      return this.date.toLocaleString('pt-BR')
    },

    expired(): boolean {
      const now = new Date()
      if (this.date < now) {
        return true
      }
      return false
    },
  },
})
</script>
