<template>
  <div class="loading-indicator"></div>
</template>

<style lang="scss" scoped>
@import "assets/scss/variable";

.loading-indicator {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  pointer-events: none;
  width: v-bind(progressWidth);
  height: 3px;
  opacity: v-bind(opacity);
  background: red;
  background-size: auto;
  transition: width 0.1s, opacity 0.5s;
  z-index: 100;
}
</style>

<script setup lang="ts">
const opacity = ref(0);
let _progress = 0;
const progressWidth = ref("0%");

const _setProgress = (num: number) => {
  let num2 = num;
  if (num2 < 0) num2 = 0;
  if (num2 > 100) num2 = 100;
  _progress = num2;
  progressWidth.value = `${num2}%`;
};

let _timer: NodeJS.Timeout | null = null;

const _startTimer = () => {
  _timer = setInterval(() => { _setProgress(_progress + 5); }, 50);
};

const _clear = () => {
  if (_timer === null) return;
  clearInterval(_timer);
  _timer = null;
};

const _start = () => {
  _clear();
  _setProgress(0);
  opacity.value = 1;
  _startTimer();
};

const _finish = () => {
  _clear();
  _setProgress(100);
  setTimeout(() => {
    opacity.value = 0;
    setTimeout(() => { _setProgress(0); }, 500);
  }, 500);
};

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", _start);
nuxtApp.hook("page:finish", _finish);
onBeforeUnmount(() => _clear);
</script>
