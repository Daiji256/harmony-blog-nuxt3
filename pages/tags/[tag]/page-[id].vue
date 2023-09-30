<template>
  <div>
    <div class="tag-title">
      <AdjustText v-bind:text="tag" />
    </div>
    <Posts v-bind:id="id" v-bind:tag="tag" />
  </div>
</template>

<style lang="scss" scoped>
.tag-title {
  @extend .font-title-large;
  margin: 16px 16px 0 16px;
  color: $color-on-surface;
}
</style>

<script setup lang="ts">
const _runtimeConfig = useRuntimeConfig();
const _siteName = _runtimeConfig.public['siteName'];
const _tagPageDescription = _runtimeConfig.public['tagPageDescription'];
const _route = useRoute();
const tag = _route.params.tag as string;
const id = Number(_route.params.id) || 1;
useSeoMeta({
  title: `${tag} – ${_siteName}`,
  ogTitle: tag,
  twitterTitle: tag,
  description: `${tag}${_tagPageDescription}`,
  ogDescription: `${tag}${_tagPageDescription}`,
  twitterDescription: `${tag}${_tagPageDescription}`,
  ogSiteName: _siteName,
  ogType: "article",
});
defineOgImage({
  component: 'Normal',
  title: tag,
});
</script>
