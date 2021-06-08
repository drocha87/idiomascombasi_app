<template>
  <span>
    {{ student.nickname || student.name || student.email }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  props: {
    student: { type: Object as () => User, required: true },
  },
})
</script>
