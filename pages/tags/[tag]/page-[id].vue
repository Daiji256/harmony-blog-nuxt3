<template>
  <div>
    <div class="tag-title">
      <AdjustText v-bind:text="tag" />
    </div>
    <Posts v-bind:id="id" v-bind:tag="tag" />
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

.tag-title {
  @extend .font-title-large;
  margin: 16px 16px 0 16px;
  color: $color-on-surface;
}
</style>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const siteName = runtimeConfig.siteName;
const route = useRoute();
const tag = route.params.tag as string;
const title = `${tag} - ${siteName}`;
const id = Number(route.params.id) || 1;
useHead({
  title: title,
});
</script>
