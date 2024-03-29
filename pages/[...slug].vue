<template>
  <div class="post">
    <ContentRenderer class="doc-body" v-bind:value="content ?? undefined">
      <template #empty>
        {{ onEmpty() }}
      </template>
      <h1 class="post-title" v-bind:id="content?.title">
        <AdjustText v-bind:text="content?.title" />
      </h1>
      <div class="post-sup-info">
        <div class="post-tag" v-for="tag in content?.tags">
          <NuxtLink v-bind:to="`/tags/${tag}/page-1`">
            <AdjustText v-bind:text="`${tag}`" />
          </NuxtLink>
        </div>
        <Date v-bind:date="content?.date" class="post-date" />
      </div>
      <ContentRendererMarkdown class="doc-body" v-bind:value="content ?? onEmpty()" />
    </ContentRenderer>
  </div>
</template>

<style lang="scss" scoped>
.post {
  font: $font-body-large;
  padding: 0 16px;

  .post-title {
    font: $font-headline-large;
    margin-top: 12px;
  }

  .post-sup-info {
    font: $font-label-large;

    .post-tag {
      display: inline-block;

      a {
        color: $color-on-surface-variant;
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
    font: $font-headline-large;
  }

  h2 {
    font: $font-headline-medium;
  }

  h3,
  h4,
  h5,
  h6 {
    font: $font-headline-small;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  p {
    text-align: justify;
  }

  p,
  li {
    a {
      padding: 4px 0;
      color: $color-primary;
      text-decoration: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:active {
        text-decoration: underline;
      }

      &::after {
        content: " ";
        opacity: 0;
      }

      &::before {
        content: " ";
        opacity: 0;
      }
    }
  }

  sup>a {
    &::after {
      content: "";
    }

    &::before {
      content: "";
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

  img {
    margin-left: auto;
    margin-right: auto;
  }

  table {
    border-collapse: collapse;
    margin: 12px auto;

    tr {
      &:first-child th {
        border-top: 2px solid $color-on-background;
        border-bottom: 1px solid $color-on-background;
      }

      &:last-child td {
        border-bottom: 2px solid $color-on-background;
      }

      th,
      td {
        padding: 4px 12px;
      }
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

  .sr-only {
    font-size: 0;
    line-height: 0;
    color: $color-transparent;
    margin: 12px 0;
    border-bottom: 1px solid $color-outline;
  }

  math {
    font-family: $font-family-math;
  }
}
</style>

<script setup lang="ts">
const _appConfig = useAppConfig();
const _siteName = _appConfig['strings'].siteName;
const { path: _path } = useRoute();
const { data: content } = await useAsyncData(_path, () => queryContent(_path).findOne());
const _isTop = _path === '/';
const onEmpty = () => {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
};
useSeoMeta({
  title: _isTop ? "" : content.value?.title,
  ogTitle: _isTop ? _siteName : content.value?.title,
  twitterTitle: _isTop ? _siteName : content.value?.title,
  description: content.value?.description,
  ogDescription: content.value?.description,
  twitterDescription: content.value?.description,
  ogSiteName: _siteName,
  ogType: _isTop ? 'website' : 'article',
});
defineOgImage({
  component: 'Normal',
  title: content.value?.title,
  description: content.value?.description,
  tags: content.value?.tags,
});
</script>
