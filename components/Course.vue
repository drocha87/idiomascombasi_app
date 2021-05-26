<template>
  <div
    class="
      flex flex-col
      md:flex-row
      mt-8
      w-full
      border-b border-gold border-opacity-40
      pb-4
      cursor-pointer
      font-ember
    "
    @click="gotoCourse(course.id)"
  >
    <div class="md:w-3/4 order-2 md:order-1 mt-2 md:pr-4">
      <!-- <div class="text-xs font-light">
        Criado em <Date :date="course.created_at" />
      </div> -->
      <div class="text-xl font-medium tracking-wide">{{ course.title }}</div>
      <div class="text-gray-500">{{ kind }}</div>
      <div class="my-4 tracking-wide font-light">
        {{ course.short_description }}
      </div>
    </div>
    <div
      v-if="course.image"
      class="order-1 md:order-2 flex justify-center items-center md:w-1/4"
    >
      <img class="object-contain" :src="course.image" alt="image" />
    </div>
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
