<template>
  <div class="flex items-center h-screen justify-center bg-white">
    <div class="flex-grow h-full"></div>
    <div class="min-w-1/2">
      <div class="font-montserrat text-5xl font-bold">B.</div>
      <div class="font-montserrat text-2xl font-medium mt-8">
        Welcome to Campus ICB
      </div>
      <div class="text-2xl font-light">Student Zone</div>
      <div class="mt-8">Login</div>
      <form class="max-w-1/2 mt-2" @submit.prevent="studentLogin">
        <Input v-model="login.email" type="email" label="Email" required />
        <Password
          v-model="login.password"
          class="mt-4"
          label="Password"
          required
        />
        <div
          class="
            text-right text-xs
            font-medium
            text-purple-500
            hover:text-purple-700
          "
        >
          <a href="#">Forgot Password?</a>
        </div>
        <div
          v-if="errorMessage !== ''"
          class="text-sm text-red-500 text-center mt-4 font-medium"
        >
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="
            w-full
            h-12
            rounded-sm
            text-white
            mt-8
            bg-purple-500
            font-medium
            hover:bg-purple-700
          "
          small
        >
          Entrar
        </button>

        <div class="text-center mt-8 text-sm font-medium text-gray-800">
          Don't have an account?
          <a class="text-purple-500 hover:text-purple-700" href="#">
            Sign Up
          </a>
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
      login: { email: '', password: '' },
      errorMessage: '',
    }
  },

  methods: {
    async studentLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        // // Status Ok
        // if (response.status === 200) {
        //   await this.$store.dispatch('students/fetchStudent')
        //   // TODO: set student in vuex and redirect to path
        // } else {
        //   this.errorMessage = response.data.message
        //   console.log(response.message)
        // }
      } catch (error) {
        this.errorMessage = error.response.data.message
      }
    },
  },
})
</script>
