<template>
  <div class="flex flex-col">
    <Label>{{ label }}</Label>
    <div v-if="hint !== ''" class="text-xs text-gray-500 mb-1 font-ember">
      {{ hint }}
    </div>
    <input
      class="
        border
        focus:outline-none focus:border-purple-900
        p-2
        px-4
        font-ember
        text-sm text-gray-800
      "
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,

  props: {
    label: { type: String, required: true },
    hint: { type: String, default: '' },
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
