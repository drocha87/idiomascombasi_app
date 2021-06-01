<template>
  <div class="max-w-screen-xl mx-auto">
    <div>
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col order-2 md:order-1 mt-4 md:w-3/4 px-4">
          <div class="text-2xl font-medium font-ember text-gray-900">
            Pré-lançamento Campus ICB
          </div>
          <p class="mt-2 font-ember tracking-wide leading-6 font-light md:pr-8">
            Olá, eu sou a Basilia Santiago, professora de Inglês e Espanhol, e
            junto com meu time de desenvolvedores, decidimos criar uma
            plataforma de ensino onde o aluno poderá registrar seu progresso,
            ter acesso a conteúdos gratuitos e participar de quizzes e aulas ao
            vivo. Ainda estamos em fase de desenvolvimento, por isso gostaríamos
            da sua ajuda. Faça seu cadastro clicando no botão abaixo e nos
            auxilie a criar algo único e relevante para os estudantes de idiomas
            estranjeiros.
          </p>
          <div class="flex-grow flex items-end mt-8">
            <Button
              class="w-full md:w-48"
              label="Fazer parte"
              @click="$router.push('/signup')"
            >
            </Button>
          </div>
        </div>
        <div
          class="
            order-1
            md:order-2
            flex
            items-center
            justify-center
            md:w-1/4
            p-8
          "
        >
          <img
            class="object-contain"
            src="https://res.cloudinary.com/euyome/image/upload/v1622033886/idiomascombasi/basi_circle_1_xigeye.png"
            alt="image"
          />
        </div>
      </div>
    </div>

    <div class="w-full bg-gold mt-8 bg-opacity-40" style="height: 1px"></div>

    <div class="mt-12">
      <h3 class="text-3xl px-4 font-ember font-light text-gray-700">Cursos</h3>
      <div class="flex flex-col">
        <div v-if="courses.length === 0" class="flex justify-center">
          <div class="flex flex-col items-center">
            <Spin size="56px" />
            <span class="text-xs font-ember text-gray-400">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div v-for="course in courses" :key="course.id">
            <Course :course="course" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  fetch() {
    this.$store.dispatch('public/courses/fetchCourses')
  },

  computed: {
    courses(): Course[] {
      const data: Course[] = this.$store.getters['public/courses/courses']
      return data
    },
  },

  methods: {
    gotoCourse(id: string): void {
      this.$router.push({ path: `/course/${id}` })
    },
  },
})
</script>
