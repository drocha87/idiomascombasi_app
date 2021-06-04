<template>
  <Select :value="value" :label="label" v-on="listeners">
    <option value="200">A1</option>
    <option value="400">A2</option>
    <option value="600">B1</option>
    <option value="800">B2</option>
    <option value="1000">C1</option>
    <option value="1200">C2</option>
  </Select>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: { type: String, default: 'Level' },
    value: { type: Number, default: 200 },
  },

  computed: {
    listeners(): any {
      const vm = this
      return Object.assign({}, this.$listeners, {
        input(v: any) {
          vm.$emit('input', parseInt(`${v}`))
        },
      })
    },
  },
})
</script>
