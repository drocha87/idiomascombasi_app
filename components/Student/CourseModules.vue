<template>
  <Accordion title="Módulos" :items="modules">
    <template #title="{ item }">
      <span
        class="ml-4 font-ember text-lg font-light"
        :class="{
          'text-gray-300': !item.released,
          'text-gray-900': item.released,
        }"
      >
        {{ item.title }}
      </span>
    </template>
    <template #content="{ item }">
      <div
        v-for="l in item.lessons"
        :key="l.id"
        class="px-4 pt-2 text-sm text-gray-900"
      >
        <div class="flex tracking-wide">
          <div class="flex flex-col flex-grow">
            <nuxt-link
              class="flex-grow font-ember"
              :class="{
                'text-gray-300': !l.released,
                'text-gray-900': l.released,
              }"
              :to="`lesson/${l.id}`"
              append
            >
              {{ findName(item.lessons_info, l.lesson_id) }}
            </nuxt-link>
            <!-- <div class="text-xs">Inicia em data</div> -->
          </div>
          <!-- <div class="text-xs font-ember text-gray-600">
            Duração: {{ l.duration }} min
          </div> -->
        </div>
      </div>
      <!-- <div class="h-2 w-full"></div> -->
    </template>
  </Accordion>
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

    course(): any {
      return this.$store.getters['public/courses/currentCourse']
    },

    modules(): any[] {
      return this.$store.getters['public/courses/modules']
    },
  },

  mounted() {
    // const [first] = this.modules
    // const item: any = this.$refs[first.id]
    // this.height = item[0].scrollHeight
  },

  methods: {
    toggleVisibility(mod: any, index: number) {
      const item: any = this.$refs[mod.id]
      this.height = item[0].scrollHeight
      this.$store.commit('public/courses/TOGGLE_MOD_VISIBILITY', index)
    },

    findName(items: any[], id: string): string {
      const item = items.find((i: any) => i.id === id)
      return item.title
    },
  },
})
</script>

<style lang="postcss" scoped>
a:hover #author-name {
  @apply text-black transition duration-700 ease-in-out;
}
</style>
