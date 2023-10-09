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
  font: $font-title-large;
  margin: 16px 16px 0 16px;
  color: $color-on-surface;
}
</style>

<script setup lang="ts">
const _appConfig = useAppConfig();
const _strings = _appConfig['strings'];
const _siteName = _strings.siteName;
const _tagPageDescription = _strings.tagPageDescription;
const _route = useRoute();
const tag = _route.params.tag as string;
const id = Number(_route.params.id) || 1;
useSeoMeta({
  title: tag,
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
