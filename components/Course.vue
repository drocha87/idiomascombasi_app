<template>
  <div
    class="
      flex flex-col
      mt-8
      max-w-xs
      border border-gold border-opacity-40
      p-4
      cursor-pointer
    "
    @click="gotoCourse(course.id)"
  >
    <div>Image</div>
    <div class="text-xs">Criado em {{ course.created_at }}</div>
    <div class="text-xl font-medium">{{ course.title }}</div>
    <div class="text-xs font-medium mt-1">
      {{ course.language }} {{ course.level }}
    </div>
    <div class="my-4 text-sm tracking-wide text-gray-700">
      {{ course.description }}
    </div>
    <div class="font-medium">{{ course.kind }} ({{ course.platform }})</div>
    <div class="text-xs font-medium text-gray-700 mt-4">
      Começa em {{ course.start_at }}
    </div>
    <div class="text-xs font-medium text-gray-700">
      Expira em {{ course.expire_at }}
    </div>
    <Button class="mt-8" small>Saiba Mais</Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    course: { type: Object, required: true },
  },
})
</script>
