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
  font: $font-body-large;
  padding: 0 16px;

  .post-title {
    font: $font-headline-large;
    margin: -56px 0 0 0;
    padding: 64px 0 0 0;
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
    margin-top: -40px;
    padding-top: 64px;

    &:first-child {
      margin-top: -64px;
    }
  }

  p a {
    padding: 4px 0;
    line-height: 3.2rem;
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
const _appConfig = useAppConfig();
const _siteName = _appConfig['strings'].siteName;
const { path: _path } = useRoute();
const posts = await queryContent(_path).find();
if (posts.length == 0) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}
const data = posts[0];
const _isTop = _path === '/';
useSeoMeta({
  title: _isTop ? "" : data.title,
  ogTitle: _isTop ? _siteName : data.title,
  twitterTitle: _isTop ? _siteName : data.title,
  description: data.description,
  ogDescription: data.description,
  twitterDescription: data.description,
  ogSiteName: _siteName,
  ogType: _isTop ? 'website' : 'article',
});
defineOgImage({
  component: 'Normal',
  title: data.title,
  description: data.description,
  tags: data.tags,
});
</script>
