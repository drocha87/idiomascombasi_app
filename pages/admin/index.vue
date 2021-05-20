<template>
  <div class="min-h-screen max-w-screen-lg mx-auto pb-32">
    <Header title="Campus ICB Admin Panel" />

    <div class="flex mt-4 items-start justify-around">
      <div class="flex flex-col">
        <nuxt-link
          class="
            m-1
            h-24
            bg-purple-500
            text-white
            w-64
            flex
            items-center
            justify-center
            rounded-lg
          "
          to="courses"
          append
        >
          Courses
        </nuxt-link>
        <nuxt-link
          class="
            m-1
            h-24
            bg-purple-500
            text-white
            w-64
            flex
            items-center
            justify-center
            rounded-lg
          "
          to="modules"
          append
        >
          Modules
        </nuxt-link>
        <nuxt-link
          class="
            m-1
            h-24
            bg-purple-500
            text-white
            w-64
            flex
            items-center
            justify-center
            rounded-lg
          "
          to="lessons"
          append
        >
          Lessons
        </nuxt-link>
      </div>
      <div class="w-64 bg-gray-200 rounded-lg p-4 m-1">
        <div class="text-sm">Useful Links:</div>
        <ul class="mt-4 pl-4">
          <li>
            <a
              href="https://forms.google.com"
              target="_blank"
              class="text-sm hover:underline"
            >
              Google Forms
            </a>
          </li>
          <li>
            <a
              href="https://drive.google.com"
              target="_blank"
              class="text-sm hover:underline"
            >
              Google Drive
            </a>
          </li>
          <li>
            <a
              href="https://idiomascombasi.com.br"
              target="_blank"
              class="text-sm hover:underline"
            >
              Campus ICB
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'admin',
})
</script>
