<template>
  <div class="loading-indicator"></div>
</template>

<style lang="scss" scoped>
@import "assets/scss/variable";

.loading-indicator {
  position: fixed;
  z-index: 11;
  top: $top-bar-height;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: calc(4px * v-bind(isShow));
  color: $color-primary;
  background-color: elevation($color-surface, $elevation-level-5);
  background-image: linear-gradient(to right, transparent 50%, currentColor 50%, currentColor 60%, transparent 60%, transparent 71.5%, currentColor 71.5%, currentColor 84%, transparent 84%);
  animation: linear infinite 2s indeterminate;
  transition: height 0.25s;
}

@keyframes indeterminate {
  0% {
    background-size: 200% 100%;
    background-position: left -31.25% top 0%;
  }

  50% {
    background-size: 800% 100%;
    background-position: left -49% top 0%;
  }

  100% {
    background-size: 400% 100%;
    background-position: left -102% top 0%;
  }
}
</style>

<script setup lang="ts">
const isShow = ref(0);

const _start = () => {
  isShow.value = 1;
};

const _finish = () => {
  setTimeout(() => {
    isShow.value = 0;
  }, 500);
};

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", _start);
nuxtApp.hook("page:finish", _finish);
</script>
