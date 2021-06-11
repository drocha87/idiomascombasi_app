<template>
  <div class="max-w-screen-md font-ember mx-auto px-4">
    <h1 class="mt-24 text-4xl text-center font-light">
      Bem-vindo(a) ao campus ICB
    </h1>
    <p class="mt-8 font-light">
      Parece que este é o seu primeiro acesso, e para que sua experiência dentro
      do campus seja personalizada aos seus interesses, eu gostaria que você
      escolhe-se um ou mais idiomas na lista abaixo, assim eu posso sugerir
      conteúdo relevante para você.
    </p>

    <div class="mt-16 flex flex-col md:flex-row justify-between">
      <div
        v-for="(interest, index) in interests"
        :key="index"
        class="
          h-24
          flex
          items-center
          justify-center
          rounded
          text-lg
          uppercase
          md:w-1/4 md:mb-0
          mb-4
          cursor-pointer
          select-none
          hover:bg-purple-400 hover:bg-opacity-10
        "
        :class="{
          'border-2 border-purple-700': interest.selected,
          'border border-purple-700 border-opacity-30': !interest.selected,
        }"
        @click="toggleInterest(index)"
      >
        {{ interest.label }}
      </div>
    </div>
    <Button
      class="mt-12 md:mt-16 ml-auto block"
      label="Enviar"
      @click="save"
    ></Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'
export default Vue.extend({
  layout: 'empty',

  data() {
    return {
      interests: [
        {
          label: 'Inglês',
          value: 'english',
          selected: false,
        },
        {
          label: 'Espanhol',
          value: 'spanish',
          selected: false,
        },
        {
          label: 'Português',
          value: 'portuguese',
          selected: false,
        },
      ],
    }
  },

  computed: {
    student(): User {
      return this.$store.getters['student/student']
    },
  },

  beforeMount() {
    // We should never reach this page if the user has some interests already defined
    this.$store.dispatch('student/fetchStudent')
    if (this.student?.interests?.length) {
      this.$router.push({ path: '/students' })
    }
  },

  methods: {
    toggleInterest(index: number) {
      this.interests[index].selected = !this.interests[index].selected
    },

    async save() {
      const interests = this.interests
        .filter((int: any) => int.selected)
        .map((int: any) => int.value)
      await this.$store.dispatch('student/updateInterests', interests)
      this.$router.push({ path: '/students' })
    },
  },
})
</script>
