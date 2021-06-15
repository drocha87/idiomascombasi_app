<template>
  <audio controls controlsList="nodownload" @play.once="play">
    <source :src="source" v-bind="$attrs" />
    Your browser does not support the audio element.
  </audio>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,
  props: {
    source: { type: String, required: true },
  },

  methods: {
    play() {
      // TODO: implement counter and set as visualized
      console.log('clicked in play')
    },
  },
})
</script>
