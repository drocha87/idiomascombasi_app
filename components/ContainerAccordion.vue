<template>
  <div class="focus:outline-none border shadow-sm">
    <div
      class="py-2 px-4 font-ember bg-gray-100 cursor-pointer"
      :class="{ 'border-b': opened }"
      @click="toggleVisibility()"
    >
      <div class="flex items-center justify-between">
        <div class="text-lg">
          {{ title }}
        </div>
        <div>
          <IconExpandLess v-if="opened" size="16px" />
          <IconExpandMore v-else size="16px" />
        </div>
      </div>
      <div v-if="subtitle !== ''" class="text-xs text-gray-600">
        {{ subtitle }}
      </div>
    </div>
    <div
      :ref="id"
      class="
        flex flex-wrap
        overflow-hidden
        transition-all
        duration-300
        ease-in-out
        transform
        md:flex-nowrap
      "
      :class="{ 'bg-white m-4': opened }"
      :style="opened ? heightStyle : 'height: 0'"
    >
      <div class="bg-white flex-grow">
        <slot />
      </div>
      <div v-if="hasAction" class="p-4 flex justify-end">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { nanoid } from 'nanoid'

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    noPadding: { type: Boolean, default: false },
  },

  data() {
    return {
      opened: false,
      height: 320,
      id: nanoid(12),
    }
  },

  computed: {
    heightStyle(): string {
      return `height: ${this.height}px;`
    },
    hasAction(): boolean {
      return !!this.$slots.action
    },
  },

  methods: {
    toggleVisibility() {
      const item: any = this.$refs[this.id]
      if (item instanceof Element) {
        this.height = item.scrollHeight
        this.opened = !this.opened
      }
    },
  },
})
</script>
