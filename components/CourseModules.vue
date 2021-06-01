<template>
  <Accordion title="Módulos" :items="modules">
    <template #content="{ item }">
      <div
        v-for="l in item.lessons"
        :key="l.id"
        class="px-4 pt-2 text-sm text-gray-900"
      >
        <div class="flex tracking-wide">
          <div class="flex flex-col flex-grow">
            {{ findName(item.lessons_info, l.lesson_id) }}
          </div>
        </div>
      </div>
    </template>
  </Accordion>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    modules(): any[] {
      return this.$store.getters['public/courses/modules']
    },
  },

  methods: {
    findName(items: any[], id: string): string {
      const item = items.find((i: any) => i.id === id)
      return item.title
    },
  },
})
</script>
