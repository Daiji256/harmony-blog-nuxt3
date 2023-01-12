<template>
	<TopBar />
	<div class="main-wrapper">
		<NuxtPage />
	</div>
	<FooterMenu />
</template>

<style lang="scss" scoped>
@import 'assets/scss/variable';

.main-wrapper {
	margin: 0 auto;
	padding-top: 64px;
	width: min(100%, $screen-medium-min);
	min-height: calc(100vh - 96px);
}
</style>

<style lang="scss">
@import '../assets/scss/variable';

html {
	font-size: 62.5%;
}

body {
	font-family: $font-family-sans-serif;
	font-feature-settings: "chws" 1;
	-webkit-text-size-adjust: 100%;
	line-break: strict;
	text-align: justify;
	color: $color-on-background;
	background-color: $color-background;

	code {
		font-family: $font-family-monospace;
	}
}

.page-enter-active,
.layout-enter-active {
	transition: 0.2s ease-in;
}

.page-leave-active,
.layout-leave-active {
	transition: 0.2s ease-out;
}

.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
	opacity: 0;
}
</style>

<script setup lang="ts">
useHead({
	htmlAttrs: [
		{ lang: 'ja' },
		{ prefix: 'og: http://ogp.me/ns#' },
	],
	charset: 'utf-8',
	viewport: 'width=device-width, initial-scale=1.0',
	meta: [
		{ property: 'og:site_name', content: useRuntimeConfig().siteName },
		{ name: 'twitter:card', content: 'summary_large_image' },
	],
	link: [
		{
			rel: 'shortcut icon',
			type: 'image/x-icon',
			href: '/favicon/favicon.ico'
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com',
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com',
			crossorigin: true,
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap',
		},
	],
});
</script>
