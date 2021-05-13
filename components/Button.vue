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
    borderColor: { type: String, default: 'border-primary' },
  },
})
</script>

<style lang="postcss" scoped>
.btn-container {
  @apply min-w-full px-12 py-2 mx-auto text-center text-black uppercase
  border border-black cursor-pointer hover:border-gray-200 transition duration-700 ease-in-out;
}

.content {
  @apply relative leading-8 font-antonio tracking-widest transition-all duration-500 ease-in-out;
}

/* .btn-container:hover .content {
  letter-spacing: 0.12rem;
}*/

.content::after {
  @apply text-xl text-black absolute;
  content: '>';
  height: 2rem;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
}

.small {
  @apply text-base;
}
</style>
