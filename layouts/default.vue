<template>
  <div class="relative">
    <DesktopNav class="fixed top-0 left-0" />
    <div class="mt-12 mb-12">
      <Nuxt keep-alive />
    </div>
    <Footer class="md:fixed md:bottom-0 md:left-0" />
  </div>
</template>

<style>
html {
  background-color: #fff;
  font-family: 'Montserrat', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
