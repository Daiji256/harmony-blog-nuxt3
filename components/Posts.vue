<template>
  <div>
    <div class="posts">
      <div v-for="post in posts">
        <PostCard class="post-card" v-bind:path="`${post._path}`" v-bind:title="post.title"
          v-bind:description="post.description" v-bind:date="post.date" v-bind:tags="post.tags" />
      </div>
    </div>
    <div v-if="postListSize > 1" class="page-chips">
      <span v-for="idx in postListSize">
        <span v-if="idx === id" class="page-chip selected" v-on:click="onSelectedClick">
          <div class="page-chip-content">{{ idx }}</div>
        </span>
        <NuxtLink v-else class="page-chip unselected" v-bind:to="`./page-${idx}`">
          <div class="page-chip-content">{{ idx }}</div>
        </NuxtLink>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.posts {
  margin: 16px 16px 0 16px;

  .post-card {
    margin-bottom: 16px;
  }
}

.page-chips {
  margin: 16px 8px 0 16px;
  text-align: center;

  .page-chip {
    display: inline-block;
    margin: 0 8px 16px 0;
    text-decoration: none;
    -webkit-tap-highlight-color: $color-transparent;

    .page-chip-content {
      font: $font-body-large;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      min-height: 48px;
      min-width: 48px;
      box-shadow: $my-box-shadow-level-1;
    }
  }

  .selected {
    cursor: pointer;

    .page-chip-content {
      color: $color-on-secondary-container;
      background-color: $color-secondary-container;
    }

    @media (hover: hover) {
      &:hover {
        .page-chip-content {
          background-color: state($color-secondary-container, $color-on-secondary-container, $state-hover);
          box-shadow: $my-box-shadow-level-2;
        }
      }
    }

    &:active {
      .page-chip-content {
        background-color: state($color-secondary-container, $color-on-secondary-container, $state-pressed);
        box-shadow: $my-box-shadow-level-1;
      }
    }
  }

  .unselected {
    .page-chip-content {
      color: $color-on-surface;
      background-color: $color-surface;
    }

    @media (hover: hover) {
      &:hover {
        .page-chip-content {
          background-color: state($color-surface, $color-on-surface, $state-hover);
          box-shadow: $my-box-shadow-level-2;
        }
      }
    }

    &:active {
      .page-chip-content {
        background-color: state($color-surface, $color-on-surface, $state-pressed);
        box-shadow: $my-box-shadow-level-1;
      }
    }
  }
}
</style>

<script setup lang="ts">
type Props = { id: number, tag: string | string[] };
const { id, tag } = defineProps<Props>();

const _allPosts = await queryContent("posts")
  .where({ "_draft": false })
  .where({ "tags": { $contains: tag } })
  .sort({ "date": -1 })
  .only(["_path", "title", "description", "date", "tags", "image"])
  .find();
const _appConfig = useAppConfig();
const _limit = _appConfig['limitPerPage'];
const posts = _allPosts.slice(_limit * (id - 1), _limit * id);
const postListSize = Math.ceil(_allPosts.length / _limit);
if (posts.length == 0) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Posts Not Found',
  });
}

const onSelectedClick = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
</script>
