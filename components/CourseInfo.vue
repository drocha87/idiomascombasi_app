<template>
  <div class="border">
    <TitleSmall class="mt-4 pl-4">Este curso inclui:</TitleSmall>
    <div class="flex flex-wrap justify-between p-4 text-sm">
      <div class="w-1/2 mb-1">109 horas de aulas</div>
      <div class="w-1/2 mb-1">107 recursos para donwload</div>
      <div class="w-1/2 mb-1">Acesso até data</div>
      <div class="w-1/2 mb-1">Aulas pela plataforma ZOOM</div>
      <div class="w-1/2 mb-1">Até 10 alunos por turma</div>
      <div class="w-1/2 mb-1">Mensalidade acessível</div>
    </div>

    <!-- action -->
    <div class="flex bg-gray-100 items-center p-4">
      <div class="flex-grow mr-12">
        <div class="text-xl font-bold text-right tracking-wider">R$ 120,00</div>
        <div class="text-xs font-medium text-right tracking-wider">por mês</div>
      </div>
      <Button class="block w-64 ml-auto" small>Participar do grupo</Button>
    </div>
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
