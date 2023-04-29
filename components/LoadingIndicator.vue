<template>
  <div class="indicator active"></div>
  <div class="indicator track"></div>
</template>

<style lang="scss" scoped>
@import "assets/scss/variable";

.indicator {
  position: fixed;
  top: $top-bar-height;
  pointer-events: none;
  height: 4px;
  opacity: v-bind(opacity);
  transition: width 0.1s, opacity 0.5s;
  z-index: 100;
}

.active {
  left: 0;
  width: v-bind(progressWidth);
  background: $color-primary;
}

.track {
  left: v-bind(progressWidth);
  width: calc(100vw - v-bind(progressWidth));
  background: $color-surface-container-highest;
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
