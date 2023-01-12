<template>
	<div>
		<NuxtLink class="post-card-click" v-bind:to="path">
			<div class="post-card-main">
				<div class="post-image-background">
					<img class="post-image" v-bind:src="image" v-bind:alt="`Thumbnail: ${title}`" loading="lazy">
				</div>
				<div class="post-info">
					<div class="post-title">{{ title }}</div>
					<div class="post-tags-date">
						<div class="post-tag" v-for="tag in tags">{{ tag }}</div>
						<Date v-bind:date="date" class="post-date" />
					</div>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variable';

.post-card-click {
	text-decoration: none;
	color: inherit;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

	.post-card-main {
		width: 100%;
		overflow: hidden;
		border-radius: 12px;
		background-color: $color-surface;
		box-shadow: $my-box-shadow-level-2;

		.post-image-background .post-image {
			width: 100%;
			aspect-ratio: $golden-ratio;
			object-fit: cover;
		}

		.post-info {
			margin: 8px 16px 12px 16px;

			.post-title {
				@extend .font-title-small;
			}

			.post-tags-date {
				@extend .font-label-small;
				color: $color-on-surface-variant;
				margin: 4px -8px 0 0;

				&::after {
					content: "";
					clear: both;
					display: block;
				}

				.post-tag {
					display: inline-block;
					margin-right: 8px;
				}

				.post-date {
					float: right;
					margin-right: 8px;
				}
			}
		}
	}

	@media (hover: hover) {
		&:hover .post-card-main {
			box-shadow: $my-box-shadow-level-1;
			background-color: rgba($color-on-surface-variant, $state-hover);

			.post-image-background {
				background-color: $color-on-surface-variant;

				.post-image:hover {
					opacity: calc(100% - $state-hover);
				}
			}
		}
	}

	&:active .post-card-main {
		box-shadow: $my-box-shadow-level-1;
		background-color: rgba($color-on-surface-variant, $state-pressed);

		.post-image-background {
			background-color: $color-on-surface-variant;

			.post-image:active {
				opacity: calc(100% - $state-pressed);
			}
		}
	}
}
</style>

<script setup lang="ts">
type Props = { title: string, date: string, tags: string[], image: string, path: string }
const { title, date, tags, image, path } = defineProps<Props>();
</script>
