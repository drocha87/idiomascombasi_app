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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error labore
          et obcaecati, neque vel laboriosam odit corporis assumenda porro
          incidunt autem excepturi quis dolor consectetur ducimus enim omnis ad
          fugiat doloribus cupiditate.
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
      return email
    },

    code(): string {
      const { code } = this.$route.query
      return code
    },
  },

  methods: {
    save() {
      const data = {
        email: this.email,
        code: this.code,
        name: this.name,
        password: this.password,
      }
      console.log(data)
    },
  },
})
</script>
