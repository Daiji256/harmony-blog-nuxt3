<template>
  <div class="posts">
    <div v-for="post in posts">
      <PostCard class="post-card" v-bind:path="post._path" v-bind:title="post.title" v-bind:description="post.description"
        v-bind:date="post.date" v-bind:tags="post.tags" />
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
</style>

<script setup lang="ts">
const title = `すべての投稿 - ${useRuntimeConfig().siteName}`;
useHead({
  title: title,
});

const posts = await queryContent("posts")
  .where({ "_draft": false })
  .sort({ "date": -1 })
  .only(["_path", "title", "description", "date", "tags", "image"])
  .find();
</script>
