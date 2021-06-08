<template>
  <div class="md:min-h-screen flex flex-col p-4 md:p-0 md:items-center">
    <div class="text-2xl text-center mb-8 mt-4 md:text-4xl font-light md:my-12">
      Welcome to campus ICB
    </div>
    <ContainerSlot
      class="max-w-screen-sm"
      title="Register Password"
      :subtitle="email"
    >
      <div>
        <p class="text-sm font-ember tracking-wide text-gray-700">
          Welcome to campus ICB, here we gonna set a new password, so ensure
          that you use a strong one.
        </p>
      </div>
      <div class="mt-8">
        <form @submit.prevent="save">
          <div>
            <Input
              v-model="name"
              class="w-full"
              label="Name"
              type="text"
              required
            />
            <Password
              v-model="password"
              class="w-full mt-2"
              label="Password"
              type="text"
              required
            />
            <Password
              class="w-full mt-2"
              label="Confirm password"
              type="text"
              error-message="Password not match"
              :match="password"
              required
            />
          </div>
          <Info class="mt-8 w-full z-50" />
          <div class="text-right mt-8">
            <Button label="Save"> </Button>
          </div>
        </form>
      </div>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'empty',

  data() {
    return {
      name: '',
      password: '',
      confirm: '',
    }
  },

  computed: {
    email(): string {
      const { email } = this.$route.query
      return email as string
    },

    code(): string {
      const { code } = this.$route.query
      return code as string
    },
  },

  methods: {
    async save() {
      const data = {
        name: this.name,
        email: this.email,
        validation_code: this.code,
        password: this.password,
      }
      await this.$store.dispatch('students/setNewPassword', data)
    },
  },
})
</script>
