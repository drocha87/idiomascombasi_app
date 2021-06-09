<template>
  <div class="flex items-center h-screen justify-center bg-white">
    <div class="hidden md:block flex-grow h-full"></div>
    <div class="min-w-1/2 p-4 md:p-0">
      <div class="font-montserrat text-5xl font-bold">B.</div>
      <div class="font-montserrat text-2xl font-medium mt-8">
        Welcome to Campus ICB
      </div>
      <div class="text-2xl font-light">Student Zone</div>
      <div class="mt-8">Login</div>
      <form class="md:max-w-1/2 mt-2" @submit.prevent="studentLogin">
        <Input v-model="login.email" type="email" label="Email" required />
        <Password
          v-model="login.password"
          class="mt-4"
          label="Password"
          required
        />
        <div
          class="
            mt-1
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
          class="text-sm text-red-500 text-center mt-4 font-medium font-ember"
        >
          {{ errorMessage }}
        </div>
        <Button type="submit" class="w-full h-12 mt-8" small label="Entrar">
        </Button>

        <div
          class="text-center mt-8 text-sm font-medium font-ember text-gray-800"
        >
          Don't have an account?
          <nuxt-link
            class="text-purple-500 hover:text-purple-700 ml-2"
            to="/signup"
          >
            Sign Up
          </nuxt-link>
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

  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push({ path: '/students' })
    }
  },

  methods: {
    async studentLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        // FIXME: api plugin copies an instance of $axios which doesn't have the
        //       token setup at that point, so here is necessary to setToken again.
        // Need research if this workaround is really necessary
        const token = (this.$auth.strategy as any).token.get()
        this.$adminapi.setToken(token)
        this.$studentapi.setToken(token)

        // // Status Ok
        // if (response.status === 200) {
        //   await this.$store.dispatch('students/fetchStudent')
        //   // TODO: set student in vuex and redirect to path
        // } else {
        //   this.errorMessage = response.data.message
        //   console.log(response.message)
        // }
      } catch (error) {
        if (error.response?.status === 401) {
          this.errorMessage = 'Email or password invalid'
        } else {
          this.errorMessage =
            error.message || error.response?.data?.message || 'Internal Error'
        }
      }
    },
  },
})
</script>
