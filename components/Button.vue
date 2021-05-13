<template>
  <a v-bind="$attrs" v-on="$listeners">
    <div
      class="btn-container"
      style="min-height: 2rem"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div class="content borderColor select-none" :class="{ small: small }">
        <slot></slot>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,

  props: {
    small: { type: Boolean, default: false },
    borderColor: { type: String, default: 'border-gray-800' },
  },
})
</script>

<style lang="postcss" scoped>
.btn-container {
  @apply px-8 py-2 text-center text-white cursor-pointer transition duration-700 ease-in-out;

  background-color: #ec5252;
  &:hover {
    background-color: #e61b1b;
  }
}

.content {
  @apply relative leading-8 font-medium transition-all duration-500 ease-in-out;
}

/* .btn-container:hover .content {
  letter-spacing: 0.12rem;
}*/

/* .content::after {
  @apply text-xl text-black absolute;
  content: '>';
  height: 2rem;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
} */

.small {
  @apply text-sm;
}
</style>
