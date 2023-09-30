<template>
  <Posts v-bind:id="id" v-bind:tag="[]" />
</template>

<script setup lang="ts">
const _runtimeConfig = useRuntimeConfig();
const _siteName = _runtimeConfig.public['siteName'];
const _postsTitle = _runtimeConfig.public['postsTitle'];
const _postsDescription = _runtimeConfig.public['postsDescription'];
const _route = useRoute();
const id = Number(_route.params.id) || 1;
useSeoMeta({
  title: `${_postsTitle} – ${_siteName}`,
  ogTitle: _postsTitle,
  twitterTitle: _postsTitle,
  description: _postsDescription,
  ogDescription: _postsDescription,
  twitterDescription: _postsDescription,
  ogSiteName: _siteName,
  ogType: "article",
});
defineOgImage({
  component: 'Normal',
  title: _postsTitle,
});
</script>
