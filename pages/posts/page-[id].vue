<template>
  <Posts v-bind:id="id" v-bind:tag="[]" />
</template>

<script setup lang="ts">
const _appConfig = useAppConfig();
const _strings = _appConfig['strings'];
const _siteName = _strings.siteName;
const _postsTitle = _strings.postsTitle;
const _postsDescription = _strings.postsDescription;
const _route = useRoute();
const id = Number(_route.params.id) || 1;
useSeoMeta({
  title: _postsTitle,
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
