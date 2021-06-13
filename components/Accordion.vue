<template>
  <ContainerSlot :title="title" no-padding>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="border-b"
        :class="{ 'bg-gray-200': openedIndex === index }"
      >
        <a
          class="cursor-pointer focus:outline-none"
          @click="toggleVisibility(item, index)"
        >
          <div class="flex items-center text-gray-900 p-2 pl-4 select-none">
            <IconExpandLess v-if="openedIndex === index" size="16px" />
            <IconExpandMore v-else size="16px" />
            <slot name="title" :item="item">
              <span class="ml-4 font-ember text-lg text-gray-900 font-light">
                {{ item.title }}
              </span>
            </slot>
          </div>
        </a>

        <div
          :ref="item.id"
          class="
            flex flex-wrap
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            transform
            md:flex-nowrap
            pl-4
          "
          :class="{ 'bg-white': openedIndex === index }"
          :style="openedIndex === index ? heightStyle : 'height: 0'"
        >
          <div class="w-full">
            <slot name="content" :item="item"></slot>
          </div>
        </div>
      </li>
    </ul>
  </ContainerSlot>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
  },

  data() {
    return {
      openedIndex: -1,
      height: 320,
    }
  },

  computed: {
    heightStyle(): string {
      return `height: ${this.height}px;`
    },
  },

  methods: {
    toggleVisibility(mod: Module, index: number) {
      const item: any = this.$refs[mod.id]
      if (!item || item.length <= 0) {
        return
      }
      this.height = item[0].scrollHeight
      this.openedIndex = this.openedIndex === index ? -1 : index
    },
  },
})
</script>

<style lang="postcss" scoped>
a:hover #author-name {
  @apply text-black transition duration-700 ease-in-out;
}
</style>
