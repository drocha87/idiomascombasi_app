<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <nuxt-link v-bind="$attrs" :to="`/admin/questions/${question.id}`">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ question.title }}</div>
        <div class="uppercase">
          {{ question.language }}
          <Level class="ml-12 mr-4" :level="question.level" />
        </div>
      </div>
    </nuxt-link>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Question } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    question: { type: Object as () => Question, required: true },
  },

  computed: {},
})
</script>
