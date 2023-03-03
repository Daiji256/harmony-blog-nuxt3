<template>
  <header>
    <div class="header-wrapper">
      <NuxtLink class="title" to="/">
        <div class="title-content">{{ siteName }}</div>
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
      <NuxtLink class="menu-item" to="/">
        <div class="text">ホーム</div>
      </NuxtLink>
      <NuxtLink class="menu-item" to="/posts">
        <div class="text">すべての投稿</div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

header {
  z-index: 1;
  position: fixed;
  width: 100%;
  background-color: $color-surface;
  box-shadow: $my-box-shadow-level-2;

  .header-wrapper {
    display: flex;
    align-items: center;
    height: 64px;
    margin: 0 auto;
    padding: 0 4px;
    width: min(100%, $screen-wrapper-max);

    .title {
      color: inherit;
      text-decoration: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

      .title-content {
        @extend .font-label-large;
        display: inline-flex;
        height: 48px;
        padding: 0 12px;
        border-radius: 24px;
        align-items: center;
      }

      @media (hover: hover) {
        &:hover .title-content {
          background-color: rgba($color-on-surface, $state-hover);
        }
      }

      &:active .title-content {
        background-color: rgba($color-on-surface, $state-pressed);
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
          background-color: rgba($color-on-surface, $state-hover);
        }
      }

      &:active .trailing-menu-content {
        background-color: rgba($color-on-surface, $state-pressed);
      }
    }
  }
}

.menu-and-scrim {
  z-index: 2;
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
    top: 56px;
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
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

      @media (hover: hover) {
        &:hover {
          background-color: state($color-surface, $color-on-surface, $state-hover);
        }
      }

      &:active {
        background-color: state($color-surface, $color-on-surface, $state-pressed);
      }

      .text {
        @extend .font-label-medium;
        display: grid;
        align-items: center;
      }
    }
  }
}
</style>

<script setup lang="ts">
const siteName = useRuntimeConfig().siteName;

const _menuVisibleWidth = 240;
const _menuVisibleHeight = 2 * 8 + 2 * 48;
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
