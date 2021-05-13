<template>
  <div class="flex items-center h-screen justify-center bg-fafa">
    <form class="w-1/4 p-8 border">
      <BaseInput v-model="name" type="text" label="Email" required />
      <BaseInput
        v-model="email"
        class="mt-4"
        type="email"
        label="Password"
        required
      />
      <Button class="block mt-8" small>Entrar</Button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: '',
      email: '',
    }
  },
})
</script>
