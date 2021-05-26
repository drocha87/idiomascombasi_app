<template>
  <a class="link" target="_blank" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </a>
</template>

<style lang="postcss" scoped>
.link {
  @apply font-redhat font-medium;
  font-size: 0.8rem;
  color: #0073bb;
}
</style>
