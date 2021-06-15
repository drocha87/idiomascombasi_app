<template>
  <video :width="width" :height="height" controls controlsList="nodownload">
    <source :src="source" v-bind="$attrs" />
    Your browser does not support the video element.
  </video>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,
  props: {
    source: { type: String, required: true },
    width: { type: String, default: '320' },
    height: { type: String, default: '240' },
  },
})
</script>
