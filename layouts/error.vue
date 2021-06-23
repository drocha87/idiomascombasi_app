<template>
  <div
    class="max-w-xs mx-auto h-screen flex flex-col items-center justify-center"
  >
    <div>
      <h1 class="mb-8 font-ember font-bold text-left text-4xl">
        {{ error.statusCode }}
      </h1>
      <p v-if="error.statusCode === 404" class="text-sm font-ember">
        I'm afraid you've found a page that doesn't exist on Campus ICB. That
        can happen when you follow a link to something that has since been
        deleted. Or the link was incorrect to begin with. <br />
        <br />
        Sorry about that. We've logged the error for review, in case it's our
        fault.
      </p>
      <p v-else-if="error.statusCode === 400" class="text-sm font-ember">
        I'm afraid you've requested a page passing the wrong data to Campus ICB
        server. Please double check the data sent to server. <br />
        <br />
        Sorry about that. We've logged the error for review, in case it's our
        fault.
      </p>

      <p v-else class="text-sm font-ember">
        I'm embarased, looks like I couldn't handle your request for some
        reason. <br />
        <br />
        Sorry about that. We've logged the error for review. Please feel free to
        contact us via
        <a href="mailto:basi@idiomascombasi.com.br"
          >basi@idiomascombasi.com.br</a
        >
      </p>
    </div>

    <!-- <div class="text-center my-12 p-4 bg-gray-100 border-l-8 border-gray-700">
      {{ error.message }}
    </div> -->
    <div class="mt-12 flex justify-center">
      <ButtonNuxtLink label="Home Page" :to="redirectTo"></ButtonNuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'empty', // you can set a custom layout for the error page
  props: {
    error: { type: Error, required: true },
  },

  computed: {
    redirectTo(): string {
      if (/^\/students\/.*/.test(this.error.path)) {
        return '/students'
      }
      if (/^\/admin\/.*/.test(this.error.path)) {
        return '/admin'
      }
      return '/'
    },
  },
})
</script>
