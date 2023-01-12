<template>
	<div class="post">
		<img class="top-image" v-bind:src="data.image" v-bind:alt="`Thumbnail: ${data.title}`">
		<h1 class="top-title" v-bind:id="data.title">{{ data.title }}</h1>
		<div class="post-tags-date">
			<NuxtLink class="post-tag" v-for="tag in data.tags" v-bind:to="`/posts?tag=${tag}`">{{ tag }}</NuxtLink>
			<Date v-bind:date="data.date" class="post-date" />
		</div>
		<div class="doc-body">
			<ContentRenderer v-bind:value="data" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variable';

.post {
	@extend .font-body;
	padding: 0 16px;

	.top-image {
		width: 100%;
		height: 160px;
		border-radius: 12px;
		object-fit: cover;
	}

	.top-title {
		@extend .font-title-large;
		margin: -56px 0 0 0;
		padding: 64px 0 0 0;
	}

	.post-tags-date {
		@extend .font-label-medium;
		line-height: 3.2rem;
		margin-right: -8px;

		&::after {
			content: "";
			clear: both;
			display: block;
		}

		.post-tag {
			display: inline-block;
			margin-right: 8px;
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

		.post-date {
			float: right;
			margin-right: 8px;
		}
	}

	.doc-body {
		margin-top: 16px;
	}
}
</style>

<style lang="scss">
@import '../assets/scss/variable';

.doc-body {
	h1 {
		@extend .font-title-large;
	}

	h2 {
		@extend .font-title-medium;
	}

	h3,
	h4,
	h5,
	h6 {
		@extend .font-title-small;
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

	img {
		width: 100%;
		border-radius: 12px;
		aspect-ratio: $golden-ratio;
		object-fit: cover;
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
	}
}
</style>

<script setup lang="ts">
const path = useRoute().path;
const content = await useAsyncData(path, () => queryContent(path).findOne());
const data = content.data;
const title = data.value.title + ' - ' + useRuntimeConfig().siteName;
const ogp = useRuntimeConfig().baseUrl + data.value.image.replace('.webp', '-ogp.jpg');
const description = data.value.description;
useHead({
	title: title,
	meta: [
		{ property: 'og:type', content: 'article' },
		{ property: 'og:title', content: title },
		{ property: 'og:image', content: ogp },
		{ property: 'og:url', content: useRuntimeConfig().baseUrl + useRoute().path },
		{ property: 'og:description', content: description },
		{ name: 'description', content: description },
	],
});
</script>
