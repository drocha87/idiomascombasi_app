<template>
  <div class="max-w-screen-sm mx-auto px-4 md:px-0">
    <div class="font-ember text-4xl font-light mt-20">Configurações</div>
    <form class="mt-8" @submit.prevent="$store.dispatch('student/updateInfo')">
      <Input
        v-model.trim="email"
        class="w-full"
        label="Email"
        hint="Email usado para fazer login no campus"
        type="text"
        disabled
      />

      <Input
        v-model.trim="name"
        class="mt-4 w-full"
        label="Nome"
        hint="Seu nome completo"
        type="text"
        required
      />

      <Input
        v-model.trim="nickname"
        class="mt-4 w-full"
        label="Nickname"
        hint="Como você gostaria de ser chamado"
        type="text"
      />

      <Input
        v-model.trim="birthday"
        class="mt-4 w-full"
        label="Data de nascimento"
        type="date"
      />

      <Input
        v-model.trim="avatar"
        class="mt-4 w-full"
        label="Imagem de perfil"
        type="url"
      />

      <Textarea
        v-model.trim="bio"
        class="mt-4"
        label="Bio"
        hint="Você já sabe bastante sobre mim, agora me fale um pouco sobre você :)"
      />

      <div class="text-right mt-4">
        <Button class="w-full md:w-32" type="submit" label="Update" small>
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '@/types'

export default Vue.extend({
  fetchOnServer: false,

  fetch() {
    this.$store.dispatch('student/fetchStudent')
  },

  computed: {
    student(): User {
      return this.$store.getters['student/student']
    },

    email(): string {
      return this.student.email
    },

    name: {
      get(): string {
        return this.student.name
      },
      set(val: string) {
        this.$store.commit('student/SET_NAME', val)
      },
    },

    birthday: {
      get(): string {
        try {
          const date = new Date(this.student.birthday)
          return date.toISOString().split('T')[0]
        } catch (_) {
          return ''
        }
      },
      set(value: string): void {
        this.$store.commit('student/SET_BIRTHDAY', value)
      },
    },

    nickname: {
      get(): string {
        return this.student.nickname
      },
      set(val: string) {
        this.$store.commit('student/SET_NICKNAME', val)
      },
    },

    avatar: {
      get(): string {
        return this.student.avatar
      },
      set(val: string) {
        this.$store.commit('student/SET_AVATAR', val)
      },
    },

    bio: {
      get(): string {
        return this.student.bio
      },
      set(val: string) {
        this.$store.commit('student/SET_BIO', val)
      },
    },
  },
})
</script>
