<template>
	<div>
		<img src="/images/sample-00.webp" class="top-image" alt="Home top image">
		<div class="icon">
			<img class="icon-image" src="/icons/icon.svg" alt="Icon image">
		</div>
		<div class="site-name">{{ siteName }}</div>
		<div class="site-description">
			このブログは
			XXX XXX XXX XXX XXX XXX XXX XXX XXX
			XXX XXX XXX XXX XXX XXX XXX XXX XXX
		</div>
		<div class="pickup-text">ピックアップ記事</div>
		<div class="pickup-posts" v-for="post in pickupPosts">
			<PostCard v-bind:path="post._path" v-bind:title="post.title" v-bind:date="post.date" v-bind:tags="post.tags"
				v-bind:image="post.image" class="post-card" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variable';

.top-image {
	width: 100%;
	aspect-ratio: $golden-ratio;
	object-fit: cover;
}

.icon {
	position: relative;
	width: 96px;
	height: 96px;
	margin: -48px auto 0 auto;

	.icon-image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		background-color: $color-background;
		box-shadow: $my-box-shadow-level-1;
	}
}

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
	meta: [
		{ property: 'og:type', content: 'blog' },
		{ property: 'og:title', content: siteName },
		{ property: 'og:image', content: useRuntimeConfig().baseUrl + '/images/sample-00-ogp.jpg' },
		{ property: 'og:url', content: useRuntimeConfig().baseUrl + useRoute().path },
		{ property: 'og:description', content: useRuntimeConfig().siteDescription },
		{ name: 'description', content: useRuntimeConfig().siteDescription },
	],
});

const posts = await queryContent('posts')
	.where({ '_draft': false })
	.sort({ 'date': -1 })
	.only(['_path', 'title', 'date', 'tags', 'image'])
	.find();

const pickupPosts = posts.filter(post => {
	return useRuntimeConfig().pickupPosts.some(path => path === post._path);
});
</script>
