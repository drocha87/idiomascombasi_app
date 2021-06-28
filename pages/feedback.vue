<template>
  <div class="md:min-h-screen flex flex-col p-4 md:p-0 md:items-center">
    <ContainerSlot
      class="max-w-screen-sm mt-24"
      title="Feedback"
      :subtitle="email"
    >
      <div>
        <p class="text-sm font-ember tracking-wide text-gray-700">
          Obrigada por reportar sua expirência dentro da plataforma, isso vai
          ser muito importante para que eu possa melhorar a sua experiência
          dentro do campus. No campo abaixo pode ficar a vontade para me
          orientar em como melhorar a plataforma, lembrando que a sua mensagem é
          privada e confidencial.
        </p>
      </div>
      <div class="mt-8">
        <form @submit.prevent="send">
          <div>
            <Textarea v-model="content" label="Mensagem"></Textarea>
          </div>
          <Info class="mt-8 w-full z-50" />
          <div class="text-right mt-8">
            <Button label="Enviar"> </Button>
          </div>
        </form>
      </div>
    </ContainerSlot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      content: '',
    }
  },
  computed: {
    email(): string {
      return this.$auth.user.email
    },
  },
  methods: {
    async send() {
      try {
        await this.$axios.$post('/students/feedback', {
          email: this.email,
          name: this.$auth?.user?.name || '',
          message: this.content,
        })

        this.content = ''
        this.$store.commit(
          'info/SET_INFO',
          'Sua mensagem foi enviada com sucesso'
        )
      } catch (error) {
        this.$store.commit('info/SET_ERROR', error)
      }
    },
  },
})
</script>
