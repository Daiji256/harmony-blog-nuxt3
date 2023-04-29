<template>
  <div>
    <NuxtLink class="post-card" v-bind:to="path">
      <div class="post-card-content">
        <div class="post-title">
          <AdjustText v-bind:text="title" />
        </div>
        <div class="post-description">
          <AdjustText v-bind:text="description" />
        </div>
        <div class="post-sup-info">
          <div class="post-tag" v-for="tag in tags">
            <AdjustText v-bind:text="tag" />
          </div>
          <Date class="post-date" v-bind:date="date" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

.post-card {
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;

  .post-card-content {
    width: 100%;
    border-radius: 12px;
    padding: 12px 16px;
    background-color: $color-surface;
    box-shadow: $my-box-shadow-level-1;

    .post-title {
      @extend .font-title-large;
      color: $color-on-surface;
    }

    .post-description {
      @extend .font-body-medium;
      color: $color-on-surface;
      margin-top: 8px;
    }

    .post-sup-info {
      @extend .font-label-medium;
      color: $color-on-surface-variant;
      margin-top: 8px;

      .post-tag {
        display: inline-block;
      }

      .post-date {
        display: inline-block;
      }

      .post-tag+.post-tag::before {
        content: "/";
        display: inline-block;
        width: 12px;
        text-align: center;
      }

      .post-tag+.post-date::before {
        content: "･";
        display: inline-block;
        width: 16px;
        text-align: center;
      }
    }
  }

  @media (hover: hover) {
    &:hover .post-card-content {
      box-shadow: $my-box-shadow-level-2;
      background-color: state($color-surface, $color-on-surface, $state-hover);
    }
  }

  &:active .post-card-content {
    box-shadow: $my-box-shadow-level-1;
    background-color: state($color-surface, $color-on-surface, $state-pressed);
  }
}
</style>

<script setup lang="ts">
type Props = { title: string, description: string, date: string, tags: string[], path: string }
const { title, description, date, tags, path } = defineProps<Props>();
</script>
