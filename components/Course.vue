<template>
  <div
    class="
      flex
      mt-8
      w-full
      border border-gold border-opacity-40
      p-4
      cursor-pointer
    "
    @click="gotoCourse(course.id)"
  >
    <div class="w-3/4">
      <div class="text-xs">Criado em <Date :date="course.created_at" /></div>
      <div class="text-xl font-medium">{{ course.title }}</div>
      <div class="font-medium">{{ kind }}</div>
      <!-- <div class="text-xs font-medium mt-1">
        {{ course.language }} {{ course.level }}
      </div> -->
      <div class="my-4 text-sm tracking-wide text-gray-700">
        {{ course.short_description }}
      </div>
      <!-- <div class="text-xs font-medium text-gray-700 mt-4">
        Começa em {{ course.start_at }}
      </div>
      <div class="text-xs font-medium text-gray-700">
        Expira em {{ course.expire_at }}
      </div> -->
      <Button class="mt-4" small label="Saiba Mais"></Button>
    </div>
    <div>Image</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    course: { type: Object, required: true },
  },

  computed: {
    kind(): string {
      switch (this.course.kind) {
        case 'live':
          return 'Aulas ao vivo'
        case 'recorded':
          return 'Aulas gravadas'
        default:
          return 'Aulas gravadas e ao vivo'
      }
    },
  },

  methods: {
    gotoCourse(id: string): void {
      this.$router.push({ path: `/course/${id}` })
    },
  },
})
</script>
