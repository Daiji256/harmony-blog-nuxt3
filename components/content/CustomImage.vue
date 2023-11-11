<template>
  <NuxtImg v-bind:src="src" v-bind:alt="alt" v-bind:sizes="sizes" v-bind:format="format" />
</template>

<script setup lang="ts">
const { src, alt, sizes, format } = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  sizes: { type: String, default: "480px" },
  format: { type: String, default: "webp" },
});
</script>
