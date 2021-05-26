<template>
  <div class="flex flex-col">
    <Label>{{ label }}</Label>
    <div v-if="hint !== ''" class="text-xs text-gray-700 mb-1">{{ hint }}</div>
    <div
      class="
        flex-grow flex
        items-center
        border
        justify-between
        focus:outline-none
        focus-within:border-purple-900
        pl-4
        p-2
      "
    >
      <input
        class="focus:outline-none w-11/12"
        :type="visible ? 'text' : 'password'"
        v-bind="$attrs"
        v-on="listeners"
      />
      <div class="w-1/12 flex items-center justify-center px-1">
        <button
          class="focus:outline-none"
          type="button"
          @click="visible = !visible"
        >
          <IconEyeClose v-if="visible" fill="#9ca3af" size="16px" />
          <IconEyeOpen v-else fill="#9ca3af" size="16px" />
        </button>
      </div>
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
    errorMessage: { type: String, default: '' },
    match: { type: String, default: '' },
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
          const val = event.target.value
          if (vm.match !== '' && vm.match !== val) {
            event.target.setCustomValidity(vm.errorMessage || 'Field not match')
          } else {
            event.target.setCustomValidity('')
          }
          vm.$emit('input', event.target.value)
        },
      })
    },
  },
})
</script>
