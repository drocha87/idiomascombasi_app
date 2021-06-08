<template>
  <Select :value="value" :label="label" v-on="listeners">
    <option value="english">English</option>
    <option value="spanish">Spanish</option>
    <option value="portuguese">Portuguese</option>
    <option value="">All</option>
  </Select>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: { type: String, default: 'english' },
    label: { type: String, default: 'Language' },
  },

  computed: {
    listeners(): any {
      const vm = this
      return Object.assign({}, this.$listeners, {
        input(v: any) {
          vm.$emit('input', v)
        },
      })
    },
  },
})
</script>
