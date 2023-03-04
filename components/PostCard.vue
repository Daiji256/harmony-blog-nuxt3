<template>
  <div>
    <NuxtLink class="post-card" v-bind:to="path">
      <div class="post-card-content">
        <div class="post-info">
          <div class="post-title">{{ title }}</div>
          <div class="post-tags-date">
            <div class="post-tag" v-for="tag in tags">{{ tag }}</div>
            <Date v-bind:date="date" class="post-date" />
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

.post-card {
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  .post-card-content {
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background-color: $color-surface;
    box-shadow: $my-box-shadow-level-2;

    .post-info {
      margin: 8px 16px 12px 16px;

      .post-title {
        @extend .font-title-large;
      }

      .post-tags-date {
        @extend .font-label-large;
        color: $color-on-surface-variant;
        margin: 4px -8px 0 0;

        &::after {
          content: "";
          clear: both;
          display: block;
        }

        .post-tag {
          display: inline-block;
          margin-right: 8px;
        }

        .post-date {
          float: right;
          margin-right: 8px;
        }
      }
    }
  }

  @media (hover: hover) {
    &:hover .post-card-content {
      box-shadow: $my-box-shadow-level-2;
      background-color: rgba($color-on-surface-variant, $state-hover);
    }
  }

  &:active .post-card-content {
    box-shadow: $my-box-shadow-level-1;
    background-color: rgba($color-on-surface-variant, $state-pressed);
  }
}
</style>

<script setup lang="ts">
type Props = { title: string, date: string, tags: string[], path: string }
const { title, date, tags, path } = defineProps<Props>();
</script>
