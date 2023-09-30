<template>
  <div class="loading-indicator" v-bind:class="{ 'loading-indicator-visible': isShow }"></div>
</template>

<style lang="scss" scoped>
.loading-indicator {
  position: fixed;
  z-index: 11;
  top: $top-bar-height;
  left: 0;
  pointer-events: none;
  height: 0;
  width: 100%;
  color: $color-primary;
  background-color: $color-surface-container-highest;
  background-image: linear-gradient(to right, transparent 50%, currentColor 50%, currentColor 60%, transparent 60%, transparent 71.5%, currentColor 71.5%, currentColor 84%, transparent 84%);
  animation: linear infinite 2s indeterminate;
  transition: height 0.25s ease-in-out;
}

.loading-indicator-visible {
  height: 4px;
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
const isShow = ref(false);
const _nuxtApp = useNuxtApp();
_nuxtApp.hook("page:start", () => {
  isShow.value = true;
});
_nuxtApp.hook("page:finish", () => {
  setTimeout(() => { isShow.value = false; }, 250);
});
</script>
