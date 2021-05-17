<template>
  <div class="border">
    <TitleSmall class="m-4">Módulos</TitleSmall>
    <ul ref="accordionContainer" class="border-t mt-4">
      <li
        v-for="(m, index) in modules"
        :key="index"
        class="border-b"
        :class="{ 'bg-gray-200': m.toggleVisibility }"
      >
        <a
          class="cursor-pointer focus:outline-none"
          @click="toggleVisibility(m, index)"
        >
          <div class="flex text-gray-900 p-2 pl-4 select-none">
            <IconExpandLess v-if="m.toggleVisibility" size="16px" />
            <IconExpandMore v-else size="16px" />
            <span id="author-name" class="ml-4">
              {{ m.title }}{{ m.toggleVisibility }}
            </span>
          </div>
        </a>

        <div
          :ref="m.id"
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
          :class="{ 'bg-gray-100': m.toggleVisibility }"
          :style="m.toggleVisibility ? heightStyle : 'height: 0'"
        >
          <div class="w-full">
            <div
              v-for="c in m.lessons_info"
              :key="c.id"
              class="px-4 pt-2 text-sm text-gray-900"
            >
              <div class="flex">
                <IconCheckBoxOutline
                  size="14px"
                  fill="#4b5563"
                  class="mr-4 mt-1"
                />
                <div class="flex flex-col flex-grow">
                  <div class="flex-grow tracking-wide">
                    {{ c.title }}
                  </div>
                  <div class="text-xs">Inicia em data</div>
                </div>
                <div class="text-xs">Duração {{ c.duration }}</div>
              </div>
            </div>
            <div class="h-4"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      height: 320,
    }
  },

  computed: {
    heightStyle(): string {
      return `height: ${this.height}px;`
    },

    modules(): any[] {
      return this.$store.getters['courses/modules']
    },
  },

  mounted() {
    console.log(this.modules)
    // const [first] = this.modules
    // const item: any = this.$refs[first.id]
    // this.height = item[0].scrollHeight
  },

  methods: {
    toggleVisibility(mod: any, index: number) {
      const item: any = this.$refs[mod.id]
      this.height = item[0].scrollHeight
      this.$store.commit('courses/TOGGLE_MOD_VISIBILITY', index)
    },
  },
})
</script>

<style lang="postcss" scoped>
a:hover #author-name {
  @apply text-black transition duration-700 ease-in-out;
}
</style>
