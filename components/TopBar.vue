<template>
  <header>
    <div class="header-wrapper">
      <NuxtLink class="title" to="/">
        <div class="title-content">
          <AdjustText v-bind:text="siteName" />
        </div>
      </NuxtLink>
      <div class="trailing-menu" v-on:click="onMenuClick">
        <div class="trailing-menu-content">
          <svg height="24" width="24" viewBox="0 96 960 960">
            <path fill="currentColor"
              d="M480 896q-33 0-56.5-23.5T400 816q0-33 23.5-56.5T480 736q33 0 56.5 23.5T560 816q0 33-23.5 56.5T480 896Zm0-240q-33 0-56.5-23.5T400 576q0-33 23.5-56.5T480 496q33 0 56.5 23.5T560 576q0 33-23.5 56.5T480 656Zm0-240q-33 0-56.5-23.5T400 336q0-33 23.5-56.5T480 256q33 0 56.5 23.5T560 336q0 33-23.5 56.5T480 416Z" />
          </svg>
        </div>
      </div>
    </div>
  </header>
  <div class="menu-and-scrim">
    <div class="scrim" v-on:click="onScrimClick"></div>
    <div class="menu">
      <NuxtLink class="menu-item" v-for="menuItem in menuItems" v-bind:to="menuItem.to">
        <div class="text">
          <AdjustText v-bind:text="menuItem.text" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

header {
  z-index: 10;
  position: fixed;
  width: 100%;
  background-color: $color-surface;
  box-shadow: $my-box-shadow-level-2;

  .header-wrapper {
    display: flex;
    align-items: center;
    height: $top-bar-height;
    margin: 0 auto;
    padding: 0 4px;
    width: min(100%, $screen-wrapper-max);

    .title {
      color: inherit;
      text-decoration: none;
      -webkit-tap-highlight-color: $color-transparent;

      .title-content {
        @extend .font-title-medium;
        display: inline-flex;
        height: 48px;
        padding: 0 12px;
        border-radius: 24px;
        align-items: center;
      }

      @media (hover: hover) {
        &:hover .title-content {
          background-color: state($color-surface, $color-on-surface, $state-hover);
        }
      }

      &:active .title-content {
        background-color: state($color-surface, $color-on-surface, $state-pressed);
      }
    }

    .trailing-menu {
      display: inline-flex;
      position: relative;
      margin-left: auto;
      cursor: pointer;

      .trailing-menu-content {
        width: 48px;
        height: 48px;
        border-radius: 24px;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      @media (hover: hover) {
        &:hover .trailing-menu-content {
          background-color: state($color-surface, $color-on-surface, $state-hover);
        }
      }

      &:active .trailing-menu-content {
        background-color: state($color-surface, $color-on-surface, $state-pressed);
      }
    }
  }
}

.menu-and-scrim {
  z-index: 20;
  position: fixed;
  visibility: v-bind(menuVisibility);
  transition: visibility 0.2s;

  .scrim {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }

  .menu {
    display: flex;
    position: fixed;
    top: calc($top-bar-height - 8px);
    right: calc((100% - min(100%, $screen-wrapper-max)) * 0.5 + 16px);
    flex-flow: column;
    padding: 8px 0;
    white-space: nowrap;
    overflow: hidden;
    background-color: $color-surface;
    border-radius: 4px;
    box-shadow: $my-box-shadow-level-2;
    opacity: v-bind(menuOpacity);
    width: v-bind(menuWidth);
    height: v-bind(menuHeight);
    transition-timing-function: ease-in-out;
    transition: height 0.2s, width 0.2s, opacity 0.2s;

    .menu-item {
      color: inherit;
      display: inline-flex;
      padding: 0 12px;
      height: 48px;
      text-decoration: none;
      -webkit-tap-highlight-color: $color-transparent;

      @media (hover: hover) {
        &:hover {
          background-color: state($color-surface, $color-on-surface, $state-hover);
        }
      }

      &:active {
        background-color: state($color-surface, $color-on-surface, $state-pressed);
      }

      .text {
        @extend .font-label-large;
        display: grid;
        align-items: center;
      }
    }
  }
}
</style>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const siteName = runtimeConfig.public['siteName'];

const menuItems: { text: string, to: string }[] = [
  { text: "ホーム", to: "/" },
  { text: "すべての投稿", to: "/posts/page-1" },
  { text: "すべてのタグ", to: "/tags" },
];
const _menuVisibleWidth = 240;
const _menuVisibleHeight = 2 * 8 + menuItems.length * 48;
const menuVisibility = ref("hidden");
const menuOpacity = ref(0);
const menuWidth = ref(`${_menuVisibleWidth / 2}px`);
const menuHeight = ref(`${_menuVisibleHeight / 2}px`);

const _showMenu = () => {
  menuVisibility.value = "visible";
  menuOpacity.value = 1;
  menuWidth.value = `${_menuVisibleWidth}px`;
  menuHeight.value = `${_menuVisibleHeight}px`;
};

const _hideMenu = () => {
  menuVisibility.value = "hidden";
  menuOpacity.value = 0;
  setTimeout(() => {
    menuWidth.value = `${_menuVisibleWidth / 2}px`;
    menuHeight.value = `${_menuVisibleHeight / 2}px`;
  }, 200);
};

const onMenuClick = () => {
  _showMenu();
};

const onScrimClick = () => {
  _hideMenu();
};

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", _hideMenu);
nuxtApp.hook("page:finish", _hideMenu);
onBeforeUnmount(() => _hideMenu);
</script>
