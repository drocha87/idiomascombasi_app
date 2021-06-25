<template>
  <div class="font-ember">
    <Label>{{ label }}</Label>
    <div v-if="hint !== ''" class="text-xs text-gray-500 mb-1">{{ hint }}</div>
    <textarea
      class="
        border
        w-full
        focus:outline-none focus:border-purple-900
        p-4
        text-gray-800 text-sm
      "
      type="text"
      v-bind="$attrs"
      v-on="listeners"
    ></textarea>
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
