<template>
  <div class="max-w-screen-xl mx-auto p-12">
    <div class="border border-gold border-opacity-50 rounded p-8">
      <div class="flex">
        <div class="flex flex-col">
          <div class="text-xl font-medium font-montserrat text-gray-900">
            Expand your career opportunities learning another language
          </div>
          <p class="max-w-3/4 mt-2 text-sm">
            Whether you work in machine learning or finance, or are pursuing a
            career in web development or data science, Python is one of the most
            important skills you can learn. Python's simple syntax is especially
            suited for desktop, web, and business
          </p>
          <div class="flex-grow flex items-end">
            <button
              class="
                mt-4
                text-sm text-purple-500
                hover:text-purple-700
                rounded
                py-2
                px-4
                font-montserrat font-medium
                border border-purple-500
              "
            >
              Comming Soon
            </button>
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
      <h3 class="text-xl">Cursos</h3>
      <div class="flex">
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
