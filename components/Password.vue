<template>
  <div class="flex flex-col">
    <Label>{{ label }}</Label>
    <div v-if="hint !== ''" class="text-xs text-gray-700 mb-1">{{ hint }}</div>
    <div
      class="
        flex-grow flex
        items-center
        border
        focus:outline-none
        focus-within:border-purple-900
        px-4
        p-1
      "
    >
      <input
        class="flex-grow focus:outline-none"
        :type="visible ? 'text' : 'password'"
        v-bind="$attrs"
        v-on="listeners"
      />
      <button
        class="focus:outline-none"
        type="button"
        @click="visible = !visible"
      >
        <IconEyeClose v-if="visible" fill="#9ca3af" />
        <IconEyeOpen v-else fill="#9ca3af" />
      </button>
    </div>
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

  data() {
    return {
      visible: false,
    }
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
