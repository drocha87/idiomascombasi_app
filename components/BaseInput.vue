<template>
  <div class="my-1">
    <label
      v-if="label.length > 0"
      for="random"
      class="text-sm font-redhat text-gray-800 mb-1 block"
      >{{ label }}</label
    >
    <input
      id="random"
      class="
        w-full
        px-2
        py-1
        border border-gray-400
        rounded-sm
        focus:outline-none
        focus:ring
        font-montserrat
      "
      :class="{
        'ring ring-red-200 focus:ring-red-200': !valid && used,
        'focus:ring-gold focus:ring-opacity-40': valid,
      }"
      v-bind="$attrs"
      :value="value"
      v-on="inputListeners"
    />
    <span class="text-xs text-red-500">
      {{ !valid && used ? message : '' }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    value: { type: String, required: true },
    label: { type: String, default: '' },
    errorMessage: { type: String, default: 'field has an error' },
    required: { type: Boolean, default: false },
  },

  data() {
    return {
      valid: true,
      used: false,
    }
  },

  computed: {
    message(): string {
      if (this.required && this.value.length <= 0) {
        return 'Preciso que você preencha o campo acima'
      }
      return this.errorMessage
    },

    inputListeners(): any {
      const vm = this
      return Object.assign({}, this.$listeners, {
        blur(event: any) {
          vm.$emit('blur', event.target.value)
          vm.used = true
          vm.valid = vm.value.length > 0 && event.target.validity.valid
        },

        input(event: any) {
          vm.$emit('input', event.target.value)
          vm.valid = event.target.validity.valid
        },
      })
    },
  },
})
</script>
