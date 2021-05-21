<template>
  <div class="max-w-screen-xl mx-auto p-12">
    <div class="border border-gold border-opacity-50 rounded p-8">
      <div class="flex">
        <div class="flex flex-col">
          <div class="text-2xl font-medium font-ember text-gray-900">
            Conquiste novas oportunidades dominando um novo idioma
          </div>
          <p
            class="
              max-w-3/4
              mt-2
              text-sm
              font-ember
              text-gray-600
              tracking-wide
            "
          >
            Se você deseja melhorar suas habilidades comunicativas e ganhar
            confiança para se comunicar com fluidez e autonomia em Inglês ou
            Espanhol, veja os cursos e o material que eu tenho para você aqui no
            CAMPUS ICB. Encontre o melhor curso que se ajuste a seu perfil e
            necessidades e amplie seus horizontes!
          </p>
          <div class="flex-grow flex items-end">
            <Button class="w-48" label="Comming soon"> </Button>
          </div>
        </div>
        <img
          class="object-contain"
          src="https://s.udemycdn.com/topic-images/lohp-topic-banners/GettyImages-1166389425_opt.jpg"
          alt="image"
        />
      </div>
    </div>

    <div class="mt-12">
      <h3 class="text-2xl">Cursos</h3>
      <div class="flex flex-col">
        <div v-for="course in courses" :key="course.id">
          <Course :course="course" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  fetchOnServer: false,

  fetch() {
    this.$store.dispatch('courses/fetchCourses')
  },

  computed: {
    courses(): any[] {
      return this.$store.getters['courses/courses']
    },
  },

  methods: {
    gotoCourse(id: string): void {
      this.$router.push({ path: `/course/${id}` })
    },
  },
})
</script>
