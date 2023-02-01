<template>
	<div>
		<div class="site-name">{{ siteName }}</div>
		<div class="site-description">
			このブログは
			XXX XXX XXX XXX XXX XXX XXX XXX XXX
			XXX XXX XXX XXX XXX XXX XXX XXX XXX
		</div>
		<div class="pickup-text">ピックアップ記事</div>
		<div class="pickup-posts" v-for="post in pickupPosts">
			<PostCard v-bind:path="post._path" v-bind:title="post.title" v-bind:date="post.date" v-bind:tags="post.tags"
				class="post-card" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variable';

.site-name {
	@extend .font-title-large;
	display: flex;
	margin: 4px auto 0 auto;
	padding: 0 16px;
	justify-content: center;
}

.site-description {
	@extend .font-body;
	display: flex;
	margin: 4px auto 0 auto;
	padding: 0 16px;
	justify-content: center;
}

.pickup-text {
	@extend .font-label-large;
	margin: 24px 16px 8px 16px;
}

.pickup-posts {
	margin: 0 16px;

	.post-card {
		margin-bottom: 16px;
	}
}
</style>

<script setup lang="ts">
const siteName = useRuntimeConfig().siteName;
useHead({
	title: siteName,
});

const posts = await queryContent('posts')
	.where({ '_draft': false })
	.sort({ 'date': -1 })
	.only(['_path', 'title', 'date', 'tags', 'image'])
	.find();

const pickupPosts = posts.filter(post => {
	return useRuntimeConfig().pickupPosts.some((path: string) => path === post._path);
});
</script>
