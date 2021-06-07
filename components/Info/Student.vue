<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <nuxt-link v-bind="$attrs" :to="`/admin/students/${student.id}`">
      <div class="flex items-center justify-between text-blueaws">
        <div>
          <StudentNickname :student="student" />
        </div>
      </div>
    </nuxt-link>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    student: { type: Object as () => User, required: true },
  },

  computed: {},
})
</script>
