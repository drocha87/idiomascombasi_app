<template>
  <div class="flex items-center h-screen justify-center bg-fafa">
    <div class="hidden md:block flex-grow">
      <div>
        <img
          src="https://res.cloudinary.com/euyome/image/upload/v1620069177/idiomascombasi/og_image_waqy0a.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="min-w-1/2 md:max-w-1/2 p-4">
      <div class="font-montserrat text-5xl font-bold">B.</div>
      <div class="font-montserrat text-2xl font-medium mt-8">
        Welcome to Campus ICB
      </div>
      <div class="text-2xl font-light">Sign Up</div>
      <!-- <div class="mt-8">Login</div> -->
      <p class="md:max-w-3/4 font-ember text-sm text-gray-600 font-light">
        Be part of this new community sharing the same goals with other people
      </p>
      <form class="md:max-w-1/2 mt-8" @submit.prevent="register">
        <Input v-model="email" type="email" label="Email Address" required />

        <div v-if="conflict" class="mt-1 font-ember text-xs text-gray-500">
          Looks like your email is already in our student database, do you want
          we to resend the confirmation email?
        </div>

        <div
          v-if="errorMessage !== ''"
          class="text-sm text-red-500 text-center mt-4 font-medium font-ember"
        >
          {{ errorMessage }}
        </div>
        <Button
          type="submit"
          class="w-full h-12 mt-8"
          small
          :label="conflict ? 'Resend Email' : 'Sign Up'"
        >
        </Button>
        <div class="text-center mt-4">
          <nuxt-link
            class="text-xs text-purple-500 font-medium hover:text-purple-700"
            to="/login"
          >
            Sign in with an existing account
          </nuxt-link>
        </div>

        <div
          class="text-center mt-8 text-sm font-ember font-medium text-gray-800"
        >
          <a class="text-purple-500" href="#"> Terms and Conditions </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'empty',

  data() {
    return {
      email: '',
      conflict: false,
      errorMessage: '',
    }
  },

  methods: {
    async register() {
      try {
        if (this.email.length > 0) {
          await this.$store.dispatch('public/register', {
            email: this.email,
            resend: this.conflict,
          })
        }
      } catch (error) {
        if (error.response?.status === 409) {
          this.conflict = true
        } else {
          this.errorMessage = error.response?.data?.message
        }
      }
    },
  },
})
</script>
