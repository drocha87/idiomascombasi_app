<template>
  <Select :value="value" :label="label" v-on="listeners">
    <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
  </Select>
</template>

<script lang="ts">
import Vue from 'vue'
import { Role } from '@/types'

export default Vue.extend({
  props: {
    value: { type: String, default: 'admin' },
    label: { type: String, default: 'Role' },
  },

  computed: {
    roles(): Role[] {
      return this.$store.getters['admin/roles/roles']
    },

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
