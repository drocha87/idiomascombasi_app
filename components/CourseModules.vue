<template>
  <div class="border">
    <TitleSmall class="m-4">Módulos</TitleSmall>
    <ul ref="accordionContainer" class="border-t mt-4">
      <li v-for="m in modules" :key="m.id" class="p-2 pl-4 border-b">
        <a
          class="cursor-pointer focus:outline-none"
          @click="toggleVisibility(m)"
        >
          <div class="flex text-sm text-gray-800">
            <IconExpandLess v-if="m.visible" size="16px" />
            <IconExpandMore v-else size="16px" />
            <span id="author-name" class="ml-4">{{ m.name }}</span>
          </div>
        </a>

        <div
          :ref="'accordion-item-' + m.id"
          class="
            flex flex-wrap
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            transform
            md:flex-nowrap
          "
          :style="m.visible ? heightStyle : 'height: 0'"
        >
          <div class="md:pr-24">
            <div
              class="p-4 font-normal tracking-wide text-gray-600 font-redhat"
            >
              - diego rocha
            </div>
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
      modules: [
        {
          id: 1,
          name: 'Diego Rocha',
          visible: false,
        },
        {
          id: 2,
          name: 'Diego Guimarães',
          visible: false,
        },
        {
          id: 3,
          name: 'Richard Dundovic',
          visible: false,
        },
        {
          id: 4,
          name: 'Laryssa Batista Cordeiro',
          visible: false,
        },
        {
          id: 5,
          name: 'Fernando Prado',
          visible: false,
        },
      ],
    }
  },

  computed: {
    heightStyle(): string {
      return `height: ${this.height}px;`
    },
  },

  mounted() {
    const item: any = this.$refs['accordion-item-1']
    this.height = item[0].scrollHeight
  },

  methods: {
    toggleVisibility(t: any) {
      const item: any = this.$refs[`accordion-item-${t.id}`]
      this.height = item[0].scrollHeight

      this.modules.forEach((item: any) => {
        if (item.id !== t.id) {
          item.visible = false
        }
      })
      t.visible = !t.visible
    },
  },
})
</script>

<style lang="postcss" scoped>
a:hover #author-name {
  @apply text-black transition duration-700 ease-in-out;
}
</style>
