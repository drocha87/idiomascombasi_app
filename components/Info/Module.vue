<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <nuxt-link v-bind="$attrs" :to="`/admin/modules/${mod.id}`">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ mod.title }}</div>
        <div class="uppercase">
          {{ mod.language }}
        </div>
      </div>
    </nuxt-link>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Module } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    mod: { type: Object as () => Module, required: true },
  },

  computed: {},
})
</script>
