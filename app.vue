<template>
  <TopAppBar />
  <div class="main-wrapper">
    <LoadingIndicator />
    <NuxtPage />
  </div>
  <FooterMenu />
</template>

<style lang="scss" scoped>
.main-wrapper {
  margin: 0 auto;
  padding-top: $top-bar-height;
  width: min(100%, $screen-wrapper-max);
  min-height: calc(100vh - $footer-height);
}
</style>

<style lang="scss">
html {
  font-size: 62.5%;
}

body {
  font-feature-settings: "chws" 1;
  -webkit-text-size-adjust: 100%;
  line-break: strict;
  text-align: justify;
  color: $color-on-background;
  background-color: $color-background;

  code {
    font-family: $font-family-monospace;
  }
}

.page-enter-active,
.layout-enter-active {
  transition: 0.25s ease-in;
}

.page-leave-active,
.layout-leave-active {
  transition: 0.25s ease-out;
}

.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "ja", prefix: "og: http://ogp.me/ns#" },
  link: [
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      href: "/favicon/favicon.ico"
    },
  ],
});
</script>
