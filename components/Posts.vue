<template>
  <div>
    <div class="posts">
      <div v-for="post in posts">
        <PostCard class="post-card" v-bind:path="post._path" v-bind:title="post.title"
          v-bind:description="post.description" v-bind:date="post.date" v-bind:tags="post.tags" />
      </div>
    </div>
    <div class="post-list-chips">
      <span v-for="idx in postListSize">
        <span v-if="idx === id" class="post-list-chip selected">
          <div class="post-list-chip-content">{{ idx }}</div>
        </span>
        <NuxtLink v-if="idx !== id" class="post-list-chip unselected" v-bind:to="`/post-list/${idx}`">
          <div class="post-list-chip-content">{{ idx }}</div>
        </NuxtLink>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

.posts {
  margin: 16px 16px 0 16px;

  .post-card {
    margin-bottom: 16px;
  }
}

.post-list-chips {
  margin: 16px 8px 0 16px;
  text-align: center;

  .post-list-chip {
    display: inline-block;
    margin: 0 8px 16px 0;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    .post-list-chip-content {
      @extend .font-body-large;
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
    .post-list-chip-content {
      color: $color-on-secondary-container;
      background-color: $color-secondary-container;
    }
  }

  .unselected {
    .post-list-chip-content {
      color: $color-on-surface;
      background-color: $color-surface;
    }

    @media (hover: hover) {
      &:hover {
        .post-list-chip-content {
          background-color: rgba($color-on-surface-variant, $state-hover);
          box-shadow: $my-box-shadow-level-2;
        }
      }
    }

    &:active {
      .post-list-chip-content {
        background-color: rgba($color-on-surface-variant, $state-pressed);
      }
    }
  }
}
</style>

<script setup lang="ts">
type Props = { id: number, tag: string | string[] };
const { id, tag } = defineProps<Props>();

const allPosts = await queryContent("posts")
  .where({ "_draft": false })
  .where({ "tags": { $contains: tag } })
  .sort({ "date": -1 })
  .only(["_path", "title", "description", "date", "tags", "image"])
  .find();
const runtimeConfig = useRuntimeConfig();
const limit = runtimeConfig.limitPerPage;
const start = limit * (id - 1);
const end = limit * id;
const posts = allPosts.slice(start, end);
const postListSize = Math.ceil(allPosts.length / limit);
</script>