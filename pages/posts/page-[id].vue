<template>
  <Posts v-bind:id="id" v-bind:tag="[]" />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const siteName = runtimeConfig.siteName;
const route = useRoute();
const title = `すべての投稿 - ${siteName}`;
const id = Number(route.params.id) || 1;
useHead({
  title: title,
});
</script>
