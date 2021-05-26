<template>
  <nuxt-link class="link" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </nuxt-link>
</template>

<style lang="postcss" scoped>
.link {
  @apply font-redhat font-medium;
  font-size: 0.8rem;
  color: #0073bb;
}
</style>
