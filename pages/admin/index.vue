<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <!-- <Header title="Campus ICB Admin Panel" /> -->
    <h1 class="text-4xl font-ember font-light">ICB Management Console</h1>

    <h1 class="text-2xl font-ember font-light mt-8">
      Hello, {{ $auth.user.nickname || $auth.user.name || $auth.user.email }}
    </h1>

    <div class="flex mt-8">
      <div class="flex-grow mr-4">
        <ContainerSlot title="ICB Services">
          <div class="flex flex-wrap items-center">
            <nuxt-link
              v-for="service in services"
              :key="service.to"
              class="
                flex
                items-center
                mb-3
                w-1/4
                text-sm text-blueaws
                font-medium
              "
              :to="service.to"
              append
            >
              <IconMaterial
                class="mr-3"
                :name="service.icon"
                size="18"
                color="gray-500"
              />
              <div>{{ service.name }}</div>
            </nuxt-link>
          </div>
        </ContainerSlot>
      </div>
      <!-- <IconMaterial name="face" size="48" color="gray-500" /> -->
      <div class="w-1/4">
        <ContainerSlot title="Useful Links">
          <div class="flex flex-col">
            <a
              class="font-ember font-xs text-blueaws"
              href="https://forms.google.com"
              target="_blank"
            >
              Google Forms
            </a>
            <a
              class="font-ember font-xs text-blueaws mt-2"
              href="https://drive.google.com"
              target="_blank"
            >
              Google Drive
            </a>
          </div>
        </ContainerSlot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin',

  data() {
    return {
      services: [
        {
          name: 'Students',
          to: 'students',
          icon: 'groups',
        },
        {
          name: 'Courses',
          to: 'courses',
          icon: 'auto_stories',
        },
        {
          name: 'Modules',
          to: 'modules',
          icon: 'view_module',
        },
        {
          name: 'Lessons',
          to: 'lessons',
          icon: 'class',
        },
        {
          name: 'Questionaires',
          to: 'questionaires',
          icon: 'quiz',
        },
        {
          name: 'Questions',
          to: 'questions',
          icon: 'help_center',
        },
      ],
    }
  },
})
</script>
