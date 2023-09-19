<template>
  <div class="tags">
    <NuxtLink class="tag" v-for="tag in tags" v-bind:to="`/tags/${tag.name}/page-1`">
      <div class="tag-content">
        <AdjustText class="tag-name" v-bind:text="tag.name" />
        <AdjustText class="tag-count" v-bind:text="`${tag.count}`" />
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.tags {
  margin: 16px 8px 0px 16px;

  .tag {
    display: inline-block;
    margin: 0 8px 16px 0;
    text-decoration: none;
    -webkit-tap-highlight-color: $color-transparent;

    @media (hover: hover) {
      &:hover {
        .tag-content {
          background-color: state($color-surface, $color-on-surface, $state-hover);
          box-shadow: $my-box-shadow-level-2;
        }
      }
    }

    &:active {
      .tag-content {
        background-color: state($color-surface, $color-on-surface, $state-pressed);
        box-shadow: $my-box-shadow-level-1;
      }
    }

    .tag-content {
      @extend .font-body-large;
      display: flex;
      align-items: center;
      border-radius: 8px;
      min-height: 32px;
      padding: 0 16px;
      color: $color-on-surface;
      background-color: $color-surface;
      box-shadow: $my-box-shadow-level-1;

      .tag-name {
        margin-right: 4px;
      }

      .tag-count {
        &::before {
          content: "(";
        }

        &::after {
          content: ")";
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
const _runtimeConfig = useRuntimeConfig();
const _siteName = _runtimeConfig.public['siteName'];
useHead({
  title: `タグ一覧 – ${_siteName}`,
});
const _posts = await queryContent('posts')
  .where({ '_draft': false })
  .only(['tags'])
  .find();
const _tagsCount: number[] = [_posts].flat().map(post => post.tags).flat().reduce(
  (prev, current) => {
    prev[current] = (prev[current] || 0) + 1;
    return prev;
  }, {},
);
const tags = Object.entries(_tagsCount)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => { return b.count - a.count });
defineOgImage({
  component: 'Normal',
  title: "タグ一覧",
});
</script>
