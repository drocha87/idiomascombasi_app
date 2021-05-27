<template>
  <ContainerSlot :title="title" no-padding>
    <ul>
      <li
        v-for="(item, index) in mappedItems"
        :key="index"
        class="border-b"
        :class="{ 'bg-gray-200': item._visible }"
      >
        <a
          class="cursor-pointer focus:outline-none"
          @click="toggleVisibility(item, index)"
        >
          <div class="flex items-center text-gray-900 p-2 pl-4 select-none">
            <IconExpandLess v-if="item._visible" size="16px" />
            <IconExpandMore v-else size="16px" />
            <span class="ml-4 font-ember text-lg text-gray-900 font-light">
              {{ item.title }}
            </span>
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
          :class="{ 'bg-white': item._visible }"
          :style="item._visible ? heightStyle : 'height: 0'"
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
    const mappedItems: any[] = this.items.map((item: any) => {
      return Object.assign({}, item, { _visible: false })
    })
    return {
      mappedItems,
      height: 320,
    }
  },

  computed: {
    heightStyle(): string {
      return `height: ${this.height}px;`
    },
  },

  methods: {
    toggleVisibility(mod: any, index: number) {
      const item: any = this.$refs[mod.id]
      this.height = item[0].scrollHeight
      this.mappedItems[index]._visible = !this.mappedItems[index]._visible

      this.mappedItems.forEach((item: any) => {
        if (item.id !== mod.id) {
          item._visible = false
        }
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
a:hover #author-name {
  @apply text-black transition duration-700 ease-in-out;
}
</style>
