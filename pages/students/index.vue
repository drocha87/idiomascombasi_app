<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="font-ember text-2xl font-light">
      Olá, {{ student.name || student.email }}
    </div>

    <ContainerSlot class="mt-8" title="Meus Cursos">
      Diego Rocha
    </ContainerSlot>
    <ContainerSlot class="mt-8" title="Sugeridos para você">
      Diego Rocha
    </ContainerSlot>
    <ContainerSlot class="mt-8" title="Ferramentas">
      Diego Rocha
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'empty',

  computed: {
    student() {
      return this.$auth.user
    },
  },
})
</script>
