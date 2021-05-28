<template>
  <div class="min-h-screen relative">
    <DashboardNav class="fixed top-0 left-0"></DashboardNav>
    <div class="mt-20 md:mb-16 px-4 md:px-0">
      <Nuxt />
    </div>
    <Footer class="absolute mt-10 md:mt-0 md:fixed md:bottom-0 md:left-0" />
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
