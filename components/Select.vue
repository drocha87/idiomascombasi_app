<template>
  <div class="flex flex-col">
    <Label>{{ label }}</Label>
    <select
      class="p-2 focus:outline-none text-sm"
      v-bind="$attrs"
      v-on="listeners"
    >
      <slot />
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,

  props: {
    label: { type: String, required: true },
  },

  computed: {
    listeners(): any {
      const vm = this
      return Object.assign({}, this.$listeners, {
        input(event: any) {
          vm.$emit('input', event.target.value)
        },
      })
    },
  },
})
</script>
