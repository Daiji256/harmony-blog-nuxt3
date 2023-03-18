<template>
  <Posts v-bind:id="id" />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const siteName = runtimeConfig.siteName;
const title = `すべての投稿 - ${siteName}`;
useHead({
  title: title,
});

const route = useRoute();
const id = Number(route.params.id) || 1;
</script>
