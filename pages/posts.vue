<template>
	<div class="posts">
		<div class="tags-filter-label" v-on:click="onClickFilter()">
			<div class="text">絞り込み</div>
			<div class="logo">
				<svg height="20" width="20" v-bind:class='{ "rotate-180": visibleTags }'>
					<path fill="currentColor" d="m10 13.062-5-5L6.062 7 10 10.938 13.938 7 15 8.062Z" />
				</svg>
			</div>
		</div>
		<div class="tags" v-bind:class='{ "hidden": !visibleTags }'>
			<div class="tag-touch-target" v-for="tag in tags" v-on:click="onClickTag(tag.name)">
				<div class="tag" v-bind:class='{ "unselected": !isSelected(tag.name), "selected": isSelected(tag.name) }'>
					{{ tag.name }}
				</div>
			</div>
		</div>
		<div v-for="post in posts">
			<PostCard v-if="containsTag(post.tags)" v-bind:path="post._path" v-bind:title="post.title" v-bind:date="post.date"
				v-bind:tags="post.tags" v-bind:image="post.image" class="post-card" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variable';

.posts {
	margin: 0 16px;

	.tags-filter-label {
		cursor: pointer;
		display: inline-flex;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

		.text {
			@extend .font-label-large;
			display: grid;
			align-items: center;
		}

		.logo {
			display: grid;
			align-items: center;

			svg {
				transition: transform 0.2s;
			}

			.rotate-180 {
				transform: rotate(180deg);
			}
		}
	}

	.tags {
		margin: 0 -8px 8px 0;

		.tag-touch-target {
			display: inline-block;
			padding: 8px 0;
			margin-right: 8px;

			.tag {
				@extend .font-label-medium;
				cursor: pointer;
				display: flex;
				border-radius: 8px;
				min-height: 32px;
				min-width: 64px;
				padding: 0 16px;
				justify-content: center;
				align-items: center;
				-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				box-shadow: $my-box-shadow-level-1;
			}
		}

		.unselected {
			color: $color-on-surface;
			background-color: $color-surface;

			@media (hover: hover) {
				&:hover {
					background-color: rgba($color-on-surface-variant, $state-hover);
				}
			}

			&:active {
				background-color: rgba($color-on-surface-variant, $state-pressed);
			}
		}

		.selected {
			color: $color-on-secondary-container;
			background-color: $color-secondary-container;

			@media (hover: hover) {
				&:hover {
					background-color: state($color-secondary-container, $color-on-surface-variant, $state-hover);
				}
			}

			&:active {
				background-color: state($color-secondary-container, $color-on-surface-variant, $state-pressed);
			}
		}
	}

	.hidden {
		visibility: hidden;
		height: 0;
	}

	.post-card {
		margin-bottom: 16px;
	}
}
</style>

<script setup lang="ts">
const title = 'すべての投稿' + ' - ' + useRuntimeConfig().siteName;
useHead({
	title: title,
	meta: [
		{ name: 'twitter:title', content: title },
		{ name: 'twitter:image', content: useRuntimeConfig().baseUrl + '/images/sample-00-ogp.jpg' },
		{ property: 'og:type', content: 'article' },
		{ property: 'og:title', content: title },
		{ property: 'og:image', content: useRuntimeConfig().baseUrl + '/images/sample-00-ogp.jpg' },
		{ property: 'og:url', content: useRuntimeConfig().baseUrl + useRoute().path },
		{ property: 'og:description', content: 'すべての投稿' },
		{ name: 'description', content: 'すべての投稿' },
	],
});

const posts = await queryContent('posts')
	.where({ '_draft': false })
	.sort({ 'date': -1 })
	.only(['_path', 'title', 'date', 'tags', 'image'])
	.find();

const tagsCount: number[] = [posts].flat().map(post => post.tags).flat().reduce(
	(prev, current) => {
		prev[current] = (prev[current] || 0) + 1;
		return prev;
	}, {}
);
const tags = Object.entries(tagsCount)
	.map(([name, count]) => ({ name, count }))
	.sort((a, b) => { return b.count - a.count });

const visibleTags = ref(false);
const onClickFilter = () => {
	visibleTags.value = !visibleTags.value;
}

const getQueryTags = () => {
	return [useRoute().query.tag].flat().filter(tag => tag != null);
}
const queryTags = ref(getQueryTags());
const isSelected = (tag) => {
	return queryTags.value.includes(tag);
}
const onClickTag = (tag) => {
	const newQueryTags = queryTags.value;
	if (isSelected(tag)) {
		newQueryTags.splice(newQueryTags.indexOf(tag), 1);
	} else {
		newQueryTags.push(tag);
	}
	useRouter().push({ query: { tag: newQueryTags } });
}
watch(() => useRoute().query, () => {
	queryTags.value = getQueryTags();
});

const containsTag = (postTags) => {
	return queryTags.value.length === 0 || queryTags.value.some(tag => postTags.includes(tag));
}
</script>
