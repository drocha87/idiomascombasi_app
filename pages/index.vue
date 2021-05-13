<template>
  <div class="max-w-screen-xl mx-auto p-12">
    <h4 class="text-center text-4xl font-antonio">Olá, Diego Rocha</h4>
    <div class="mt-12">
      <div>
        <h3 class="text-xl">Cursos</h3>

        <div v-for="course in courses" :key="course.id">
          <div
            class="
              flex flex-col
              mt-8
              max-w-xs
              border border-gold border-opacity-40
              p-4
            "
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
            <div class="font-medium">
              {{ course.kind }} ({{ course.platform }})
            </div>
            <div class="text-xs font-medium text-gray-700 mt-4">
              Começa em {{ course.start_at }}
            </div>
            <div class="text-xs font-medium text-gray-700">
              Expira em {{ course.expire_at }}
            </div>
            <Button class="mt-8" small>Saiba Mais</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      courses: [
        {
          id: '',
          image: '',
          title: 'Español con Basi',
          created_at: '01/04/2021',
          level: 'Iniciante',
          language: 'Espanhol',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste debitis maiores totam mollitia aliquam? Quaerat autem distinctio reiciendis dicta sit dolor voluptates voluptatum excepturi.',
          kind: 'Online ao vivo',
          platform: 'ZOOM',
          start_at: '20/05/2021',
          expire_at: '20/05/2021',
        },
      ],
    }
  },
})
</script>
