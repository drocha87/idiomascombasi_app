<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <div class="flex items-center justify-between text-blueaws">
      <a :href="`mailto:${lead.email}`">{{ lead.email }}</a>
      <div class="capitalize">
        {{ lead.name }}
      </div>
    </div>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Lead } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    lead: { type: Object as () => Lead, required: true },
  },

  computed: {},
})
</script>
