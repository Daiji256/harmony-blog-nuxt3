<template>
	<header v-bind:class='{ "on-scroll": isScroll }'>
		<div class="menu-click" v-on:click="onMenuClick">
			<div class="menu">
				<svg height="24" width="24" v-bind:class='{ "transparent": isOpen }'>
					<path fill="currentColor" d="M3 18V16H21V18ZM3 13V11H21V13ZM3 8V6H21V8Z" />
				</svg>
				<svg height="24" width="24" v-bind:class='{ "transparent": !isOpen }'>
					<path fill="currentColor"
						d="M3 18V16H16V18ZM3 13V11H13V13ZM3 8V6H16V8ZM19.6 17 14.6 12 19.6 7 21 8.4 17.4 12 21 15.6Z" />
				</svg>
			</div>
		</div>
		<div class="header-box">
			<NuxtLink class="title-click" to="/" v-on:click="closeMenu">
				<div class="title">{{ siteName }}</div>
			</NuxtLink>
		</div>
	</header>
	<div class="drawer" v-bind:class='{ "drawer-open": isOpen, "drawer-swipe": isSwipe }'>
		<div class="drawer-scrim" v-on:click="closeMenu"></div>
		<div class="drawer-content">
			<NuxtLink class="drawer-menu" v-bind:class='{ "active": getIsActive("/") }' v-on:click="closeMenu" to="/">
				<div class="logo">
					<svg height="24" width="24">
						<path fill="currentColor"
							d="M4 21V9L12 3L20 9V21H14V14H10V21ZM6 19H8V12H16V19H18V10L12 5.5L6 10ZM12 12.25Z" />
					</svg>
				</div>
				<div class="text">ホーム</div>
			</NuxtLink>
			<NuxtLink class="drawer-menu" v-bind:class='{ "active": getIsActive("/posts") }' v-on:click="closeMenu"
				to="/posts">
				<div class="logo">
					<svg height="24" width="24">
						<path fill="currentColor"
							d="M6 9H18V4H6ZM4 11V2H20V11ZM6 20H18V15H6ZM4 22V13H20V22ZM6 9V4V9ZM6 20V15V20Z" />
					</svg>
				</div>
				<div class="text">
					すべての投稿
				</div>
			</NuxtLink>
			<NuxtLink class="drawer-menu" v-bind:class='{ "active": getIsActive("/photo-gallery") }' v-on:click="closeMenu"
				to="/photo-gallery">
				<div class="logo">
					<svg height="24" width="24">
						<path fill="currentColor"
							d="M3 11V3H11V11ZM3 21V13H11V21ZM13 11V3H21V11ZM13 21V13H21V21ZM5 9H9V5H5ZM15 9H19V5H15ZM15 19H19V15H15ZM5 19H9V15H5ZM15 9ZM15 15ZM9 15ZM9 9Z" />
					</svg>
				</div>
				<div class="text">ギャラリー</div>
			</NuxtLink>
			<hr class="line">
			<NuxtLink class="drawer-menu" v-bind:class='{ "active": getIsActive("/privacy-policy") }' v-on:click="closeMenu"
				to="/privacy-policy">
				<div class="logo">
					<svg height="24" width="24">
						<path fill="currentColor"
							d="M12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-10Zm0 7.9q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Z" />
					</svg>
				</div>
				<div class="text">プライバシーポリシー</div>
			</NuxtLink>
			<a class="drawer-menu" target="_blank" rel="noopener" href="https://example.com">
				<div class="logo">
					<svg height="24" width="24">
						<path fill="currentColor"
							d="M8 18H16V16H8ZM8 14H16V12H8ZM6 22Q5.175 22 4.588 21.413Q4 20.825 4 20V4Q4 3.175 4.588 2.587Q5.175 2 6 2H14L20 8V20Q20 20.825 19.413 21.413Q18.825 22 18 22ZM13 9V4H6Q6 4 6 4Q6 4 6 4V20Q6 20 6 20Q6 20 6 20H18Q18 20 18 20Q18 20 18 20V9ZM6 4V9V4V9V20Q6 20 6 20Q6 20 6 20Q6 20 6 20Q6 20 6 20V4Q6 4 6 4Q6 4 6 4Z" />
					</svg>
				</div>
				<div class="text">お問い合わせ</div>
				<div class="open-in-new">
					<svg height="24" width="24">
						<path fill="currentColor"
							d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z" />
					</svg>
				</div>
			</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variable';

header {
	z-index: 1;
	display: flex;
	position: fixed;
	align-items: center;
	width: 100%;
	height: 64px;
	user-select: none;
	background-color: $color-surface;
	transition-timing-function: ease-in-out;
	transition: background-color 0.4s;

	.menu-click {
		position: relative;
		margin-left: 4px;
		margin-right: 12px;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		cursor: pointer;

		.menu {
			width: 48px;
			height: 48px;
			border-radius: 24px;

			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.transparent {
				color: transparent;
			}
		}

		@media (hover: hover) {
			&:hover .menu {
				background-color: rgba($color-on-surface, $state-hover);
			}
		}

		&:active .menu {
			background-color: rgba($color-on-surface, $state-pressed);
		}
	}

	.header-box {
		margin-right: 64px;
		width: calc(100% - 128px);
		text-align: center;

		.title-click {
			display: inline-flex;
			color: inherit;
			text-decoration: none;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

			.title {
				@extend .font-label-large;
				display: inline-flex;
				height: 48px;
				padding: 0 12px;
				border-radius: 24px;
				align-items: center;
			}

			@media (hover: hover) {
				&:hover .title {
					background-color: rgba($color-on-surface, $state-hover);
				}
			}

			&:active .title {
				background-color: rgba($color-on-surface, $state-pressed);
			}
		}
	}
}

.on-scroll {
	background-color: elevation($color-surface, $elevation-level-2);
}

.drawer {
	z-index: 1;
	position: fixed;
	margin-top: 64px;
	visibility: hidden;
	transition: visibility 0.2s;

	.drawer-scrim {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-color: rgba($color-neutral-0, 0.4);
		opacity: 0;
		transition-timing-function: ease-in;
		transition: opacity 0.2s;
	}

	.drawer-content {
		display: flex;
		flex-flow: column;
		overflow: auto;
		width: min(360px, 75vw);
		height: calc(var(--vh, 0.5vh) * 100 - 64px);
		padding-left: 12px;
		padding-right: 12px;
		background-color: $color-surface;
		border-top-right-radius: 16px;
		border-bottom-right-radius: 16px;
		transform: translateX(-100%);
		transition-timing-function: ease-in;
		transition: transform 0.2s;

		.line {
			width: calc(100% - 32px);
			margin: 0 16px;
			border: none;
			border-bottom: 1px solid $color-outline;
		}

		.drawer-menu {
			text-decoration: none;
			color: inherit;
			display: inline-flex;
			border-radius: 28px;
			padding-left: 16px;
			padding-right: 16px;
			min-height: 56px;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

			@media (hover: hover) {
				&:hover {
					background-color: state($color-surface, $color-on-surface, $state-hover);
				}
			}

			&:active {
				background-color: state($color-surface, $color-on-surface, $state-pressed);
			}

			.logo {
				display: grid;
				align-items: center;
				margin-right: 12px;
			}

			.text {
				display: grid;
				align-items: center;
				@extend .font-label-medium;
			}

			.open-in-new {
				display: grid;
				align-items: center;
				margin-left: 4px;
				color: $color-on-surface-variant;
			}
		}

		.active {
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
}

.drawer-open {
	visibility: visible;

	.drawer-scrim {
		opacity: 1;
	}

	.drawer-content {
		transform: translateX(0%);
	}
}

.drawer-swipe {
	transition: visibility 0s;

	.drawer-scrim {
		opacity: var(--drawer-opacity, 1);
		transition: opacity 0s;
	}

	.drawer-content {
		transform: translateX(var(--drawer-translate-x, 0%));
		transition: transform 0s;
	}
}
</style>

<script setup lang="ts">
const siteName = useRuntimeConfig().siteName

const getIsActive = (current: String) => {
	// TODO: スラッシュをとりあえず消して処理している
	return useRoute().path.replaceAll('/', '') === current.replaceAll('/', '');
}

const isScroll = ref(false);
const onScroll = () => {
	isScroll.value = window.scrollY > 0;
}

const isOpen = ref(false);
const onMenuClick = () => {
	isOpen.value = !isOpen.value;
}
const closeMenu = () => {
	isOpen.value = false;
}

let vh: number = 0;
let drawerRightX: number = 360;
const onResize = () => {
	vh = window.innerHeight * 0.01;
	drawerRightX = window.innerWidth * 0.75 < 360 ? window.innerWidth * 0.75 : 360;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const frameInterval: number = 1000 / 30;
const isSwipe = ref(false);
let startX: number = 0;
let touchePrevX: number = 0;
let toucheX: number = 0;
let swipeLength: number = 0;
let isAnimated = false;
const animation = () => {
	if (!isAnimated) return;
	touchePrevX = toucheX;
	swipeLength = startX - toucheX > 0 ? startX - toucheX : 0;
	document.documentElement.style.setProperty('--drawer-opacity', `${1 - swipeLength / drawerRightX}`);
	document.documentElement.style.setProperty('--drawer-translate-x', `${- swipeLength / drawerRightX * 100}%`);
	setTimeout(animation, frameInterval);
}
const onTouchStart = (event) => {
	if (!isOpen.value) return;
	isAnimated = true;
	isSwipe.value = true;
	toucheX = event.touches[0].pageX;
	startX = toucheX < drawerRightX ? toucheX : drawerRightX;
	document.documentElement.style.setProperty('--drawer-opacity', `1`);
	document.documentElement.style.setProperty('--drawer-translate-x', `0%`);
	animation();
}
const onTouchMove = (event) => {
	toucheX = event.touches[0].pageX;
}
const onTouchEnd = () => {
	if (!isOpen.value) return;
	isAnimated = false;
	// 10 は適当な値
	if (toucheX - touchePrevX < -10 || (toucheX - touchePrevX < 10 && swipeLength > drawerRightX / 2)) {
		closeMenu();
	}
	isSwipe.value = false;
}

onMounted(() => {
	vh = window.innerHeight * 0.01;
	drawerRightX = window.innerWidth * 0.75 < 360 ? window.innerWidth * 0.75 : 360;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	window.addEventListener('resize', onResize);
	window.addEventListener('touchstart', onTouchStart);
	window.addEventListener('touchmove', onTouchMove);
	window.addEventListener('touchend', onTouchEnd);
	window.addEventListener('touchcancel', onTouchEnd);
	window.addEventListener('popstate', closeMenu);
	window.addEventListener('scroll', onScroll);
});
onBeforeUnmount(() => {
	isAnimated = false;
	window.removeEventListener('resize', onResize);
	window.removeEventListener('touchstart', onTouchStart);
	window.removeEventListener('touchmove', onTouchMove);
	window.removeEventListener('touchend', onTouchEnd);
	window.removeEventListener('touchcancel', onTouchEnd);
	window.removeEventListener('popstate', closeMenu);
});
</script>
