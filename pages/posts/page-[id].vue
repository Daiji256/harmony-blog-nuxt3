<template>
  <Posts v-bind:id="id" v-bind:tag="[]" />
</template>

<script setup lang="ts">
const _runtimeConfig = useRuntimeConfig();
const _siteName = _runtimeConfig.public['siteName'];
const _route = useRoute();
const id = Number(_route.params.id) || 1;
useHead({
  title: `すべての投稿 – ${_siteName}`,
});
defineOgImage({
  component: 'Normal',
  title: "すべての投稿",
});
</script>
