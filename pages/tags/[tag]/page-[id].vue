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
const _route = useRoute();
const tag = _route.params.tag as string;
const id = Number(_route.params.id) || 1;
useHead({
  title: `${tag} – ${_siteName}`,
});
defineOgImage({
  component: 'Normal',
  title: tag,
});
</script>
