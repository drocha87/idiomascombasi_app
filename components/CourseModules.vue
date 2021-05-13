<template>
  <div class="border">
    <TitleSmall class="m-4">Módulos</TitleSmall>
    <ul ref="accordionContainer" class="border-t mt-4">
      <li
        v-for="m in modules"
        :key="m.id"
        class="border-b"
        :class="{ 'bg-gray-200': m.visible }"
      >
        <a
          class="cursor-pointer focus:outline-none"
          @click="toggleVisibility(m)"
        >
          <div class="flex text-gray-900 p-2 pl-4 select-none">
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
            pl-4
          "
          :class="{ 'bg-gray-100': m.visible }"
          :style="m.visible ? heightStyle : 'height: 0'"
        >
          <div class="w-full">
            <div
              v-for="c in m.classes"
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
                    {{ c.name }}
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
      modules: [
        {
          id: 1,
          name: 'Informal Greetings',
          visible: false,
          classes: [
            {
              id: 11,
              name: 'First class to learning something',
              duration: '45',
            },
            {
              id: 12,
              name: 'Second class to learning something',
              duration: '45',
            },
            {
              id: 13,
              name: 'Third class to learning something',
              duration: '45',
            },
          ],
        },
        {
          id: 2,
          name: 'Talking about yourself',
          visible: false,
          classes: [
            {
              id: 11,
              name: 'First class to learning something',
              duration: '45',
            },
            {
              id: 12,
              name: 'Second class to learning something',
              duration: '45',
            },
            {
              id: 13,
              name: 'Third class to learning something',
              duration: '45',
            },
          ],
        },
        {
          id: 3,
          name: 'Talk about your family',
          visible: false,
          classes: [
            {
              id: 11,
              name: 'First class to learning something',
              duration: '45',
            },
            {
              id: 12,
              name: 'Second class to learning something',
              duration: '45',
            },
            {
              id: 13,
              name: 'Third class to learning something',
              duration: '45',
            },
          ],
        },
        {
          id: 4,
          name: 'Job interview',
          visible: false,
          classes: [
            {
              id: 11,
              name: 'First class to learning something',
              duration: '45',
            },
            {
              id: 12,
              name: 'Second class to learning something',
              duration: '45',
            },
            {
              id: 13,
              name: 'Third class to learning something',
              duration: '45',
            },
          ],
        },
        {
          id: 5,
          name: 'Phrasal Verbs',
          visible: false,
          classes: [
            {
              id: 11,
              name: 'First class to learning something',
              duration: '45',
            },
            {
              id: 12,
              name: 'Second class to learning something',
              duration: '45',
            },
            {
              id: 13,
              name: 'Third class to learning something',
              duration: '45',
            },
          ],
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
