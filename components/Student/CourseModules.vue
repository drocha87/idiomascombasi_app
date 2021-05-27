<template>
  <Accordion title="Módulos" :items="modules">
    <template #content="{ item }">
      <div
        v-for="l in item.lessons_info"
        :key="l.id"
        class="px-4 pt-2 text-sm text-gray-900"
      >
        <div class="flex tracking-wide">
          <div class="flex flex-col flex-grow">
            <nuxt-link
              class="flex-grow font-ember"
              :to="`lesson/${l.id}`"
              append
            >
              {{ l.title }}
            </nuxt-link>
            <!-- <div class="text-xs">Inicia em data</div> -->
          </div>
          <div class="text-xs font-ember text-gray-600">
            Duração: {{ l.duration }} min
          </div>
        </div>
      </div>
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
  },
})
</script>

<style lang="postcss" scoped>
a:hover #author-name {
  @apply text-black transition duration-700 ease-in-out;
}
</style>
