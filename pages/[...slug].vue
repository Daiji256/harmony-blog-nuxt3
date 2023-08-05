<template>
  <div class="post">
    <ContentRenderer v-bind:value="data">
      <h1 class="post-title" v-bind:id="data.title">
        <AdjustText v-bind:text="data.title" />
      </h1>
      <div class="post-sup-info">
        <div class="post-tag" v-for="tag in data.tags">
          <NuxtLink v-bind:to="`/tags/${tag}/page-1`">
            <AdjustText v-bind:text="`${tag}`" />
          </NuxtLink>
        </div>
        <Date v-bind:date="data.date" class="post-date" />
      </div>
      <ContentRendererMarkdown class="doc-body" v-bind:value="data" />
    </ContentRenderer>
  </div>
</template>

<style lang="scss" scoped>
.post {
  @extend .font-body-large;
  padding: 0 16px;

  .post-title {
    @extend .font-headline-large;
    margin: -56px 0 0 0;
    padding: 64px 0 0 0;
  }

  .post-sup-info {
    @extend .font-label-large;

    .post-tag {
      display: inline-block;

      a {
        color: $color-link;
        text-decoration: none;

        @media (hover: hover) {
          &:hover {
            text-decoration: underline;
          }
        }

        &:active {
          text-decoration: underline;
        }
      }
    }

    .post-date {
      display: inline-block;
      color: $color-on-surface-variant;
    }

    .post-tag+.post-tag::before {
      content: "/";
      display: inline-block;
      color: $color-on-surface-variant;
      width: 12px;
      text-align: center;
    }

    .post-tag+.post-date::before {
      content: "･";
      display: inline-block;
      color: $color-on-surface-variant;
      width: 16px;
      text-align: center;
    }
  }

  .doc-body {
    margin-top: 16px;
  }
}
</style>

<style lang="scss">
.doc-body {
  h1 {
    @extend .font-headline-large;
  }

  h2 {
    @extend .font-headline-medium;
  }

  h3,
  h4,
  h5,
  h6 {
    @extend .font-headline-small;
  }

  h2,
  h3,
  h4 {
    a {
      color: inherit;
      text-decoration: none;
      pointer-events: none;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: -40px;
    padding-top: 64px;

    &:first-child {
      margin-top: -64px;
    }
  }

  p a {
    padding: 4px 0;
    line-height: 3.2rem;
    color: $color-link;
    text-decoration: none;

    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }

    &:active {
      text-decoration: underline;
    }
  }

  ul,
  ol {
    margin: 0;
    padding: 0 0 0 24px;
  }

  hr {
    margin: 8px 0;
    border: none;
    border-bottom: 1px solid $color-outline;
  }

  strong {
    font-weight: 500;
  }

  em {
    color: $color-primary;
    font-style: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  img,
  pre {
    margin-bottom: 16px;

    &+.math {
      margin-top: -16px;
    }
  }

  .math-display {
    padding: 8px 0;
    text-align: center;
  }

  .math-inline {
    &::before {
      content: " ";
    }

    &::after {
      content: " ";
    }
  }

  pre {
    display: block;
    width: 100%;
    background-color: $color-surface-container-low;
    border: 1px solid $color-outline;
    border-radius: 12px;
    padding: 8px 12px;
    overflow-x: auto;
  }

  :not(pre) code {
    display: inline-block;
    background-color: $color-surface-container-low;
    border-radius: 4px;
    padding: 0 4px;
    margin-bottom: -0.15rem;
  }

  math {
    font-family: $font-family-math;
  }
}
</style>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const siteName = runtimeConfig.public['siteName'];
const { path } = useRoute();
const data = await queryContent(path).findOne();
useHead({
  title: `${data.title} - ${siteName}`,
});

defineOgImage({
  component: 'Normal',
  title: data.title,
  description: data.description,
  tags: data.tags,
});
</script>
