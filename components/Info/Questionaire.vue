<template>
  <div class="block border rounded p-2 text-xs font-medium">
    <nuxt-link v-bind="$attrs" :to="`/admin/questionaires/${questionaire.id}`">
      <div class="flex items-center justify-between text-blueaws">
        <div>{{ questionaire.title }}</div>
        <div class="uppercase">
          {{ questionaire.language }}
          <!-- TODO: add questionaire level -->
          <!-- <Level class="ml-12 mr-4" :level="question.level" /> -->
        </div>
      </div>
    </nuxt-link>
    <slot name="action"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Questionaire } from '@/types'

export default Vue.extend({
  inheritAttrs: false,

  props: {
    questionaire: { type: Object as () => Questionaire, required: true },
  },

  computed: {},
})
</script>
