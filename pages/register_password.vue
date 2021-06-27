<template>
  <div class="md:min-h-screen flex flex-col p-4 md:p-0 md:items-center">
    <div class="text-2xl text-center mb-8 mt-4 md:text-4xl font-light md:my-12">
      Bem-vindo(a) ao campus ICB
    </div>
    <ContainerSlot
      class="max-w-screen-sm"
      title="Cadastrar senha"
      :subtitle="email"
    >
      <div>
        <p class="text-sm font-ember tracking-wide text-gray-700">
          Bem-vindo(a) ao campus ICB. Vamos registrar uma senha para seu acesso
          a plataforma. Lembre-se de usar uma senha segura.
        </p>
      </div>
      <div class="mt-8">
        <form @submit.prevent="save">
          <div>
            <Input
              v-model="name"
              class="w-full"
              label="Nome"
              type="text"
              required
            />
            <Password
              v-model="password"
              class="w-full mt-2"
              label="Senha"
              type="text"
              required
            />
            <Password
              class="w-full mt-2"
              label="Confirme sua senha"
              type="text"
              error-message="Senha não coincidem"
              :match="password"
              required
            />
          </div>
          <Info class="mt-8 w-full z-50" />
          <div class="text-right mt-8">
            <Button label="Salvar"> </Button>
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
      try {
        const data = {
          name: this.name,
          email: this.email,
          validation_code: this.code,
          password: this.password,
        }
        await this.$axios.$post('/auth/password', data)
        this.$router.push('/login')
      } catch (error) {
        this.$store.commit('SET_ERROR', error, { root: true })
      }
    },
  },
})
</script>
