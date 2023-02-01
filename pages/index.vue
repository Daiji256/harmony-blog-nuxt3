<template>
	<div>
		<div class="site-name">{{ siteName }}</div>
		<div class="site-description">
			このブログは
			XXX XXX XXX XXX XXX XXX XXX XXX XXX
			XXX XXX XXX XXX XXX XXX XXX XXX XXX
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
</style>

<script setup lang="ts">
const siteName = useRuntimeConfig().siteName;
useHead({
	title: siteName,
});
</script>
