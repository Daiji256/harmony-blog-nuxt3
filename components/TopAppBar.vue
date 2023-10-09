<template>
  <header v-bind:class="{ 'header-is-at-top': isAtTop, 'header-is-not-at-top': !isAtTop }">
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
    <div v-bind:class="{ 'scrim': isShowMenu }" v-on:click="onScrimClick"></div>
    <div class="menu" v-bind:class="{ 'menu-visible': isShowMenu, 'menu-hidden': !isShowMenu }">
      <NuxtLink class="menu-item" to="/">
        <div class="text">
          <AdjustText text="ホーム" />
        </div>
      </NuxtLink>
      <NuxtLink class="menu-item" to="/posts/page-1">
        <div class="text">
          <AdjustText text="すべての投稿" />
        </div>
      </NuxtLink>
      <NuxtLink class="menu-item" to="/tags">
        <div class="text">
          <AdjustText text="すべてのタグ" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  z-index: 10;
  position: fixed;
  width: 100%;

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
        font: $font-title-medium;
        display: inline-flex;
        height: 48px;
        padding: 0 12px;
        border-radius: 24px;
        align-items: center;
      }

      @media (hover: hover) {
        &:hover .title-content {
          background-color: state($color-on-surface, $state-hover);
        }
      }

      &:active .title-content {
        background-color: state($color-on-surface, $state-pressed);
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
          background-color: state($color-on-surface, $state-hover);
        }
      }

      &:active .trailing-menu-content {
        background-color: state($color-on-surface, $state-pressed);
      }
    }
  }
}

.header-is-at-top {
  background-color: $color-surface;
  transition: background-color 0.25s ease-in-out;
}

.header-is-not-at-top {
  background-color: elevation($color-surface-container, $elevation-level-2);
  transition: background-color 0.25s ease-in-out;
}

.menu-and-scrim {
  z-index: 20;
  position: fixed;

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
    width: 240px;

    .menu-item {
      color: inherit;
      display: inline-flex;
      padding: 0 12px;
      text-decoration: none;
      -webkit-tap-highlight-color: $color-transparent;

      @media (hover: hover) {
        &:hover {
          background-color: state($color-on-surface, $state-hover);
        }
      }

      &:active {
        background-color: state($color-on-surface, $state-pressed);
      }

      .text {
        font: $font-label-large;
        display: grid;
        align-items: center;
      }
    }
  }

  .menu-visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.125s ease-in-out;

    .menu-item {
      height: 48px;
      transition: height 0.25s ease-in-out;
    }
  }

  .menu-hidden {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.125s ease-in-out, visibility 0s 0.25s;

    .menu-item {
      height: 16px;
      transition: height 0.125s ease-in-out;
    }
  }
}
</style>

<script setup lang="ts">
const _appConfig = useAppConfig();
const siteName = _appConfig['strings'].siteName;
const isShowMenu = ref(false);
const isAtTop = ref(true);

const _showMenu = () => {
  isShowMenu.value = true;
};

const _hideMenu = () => {
  isShowMenu.value = false;
};

const _updateIsAtTop = () => {
  if (process.client) {
    isAtTop.value = window.scrollY <= 0;
  }
};

const onMenuClick = () => {
  _showMenu();
};

const onScrimClick = () => {
  _hideMenu();
};

const _nuxtApp = useNuxtApp();
_nuxtApp.hook("page:start", () => {
  _hideMenu();
  _updateIsAtTop();
});
_nuxtApp.hook("page:finish", () => {
  _hideMenu();
  _updateIsAtTop();
});
onBeforeUnmount(() => {
  _hideMenu();
});
onMounted(() => {
  window.addEventListener("scroll", _updateIsAtTop);
});
onUnmounted(() => {
  window.removeEventListener("scroll", _updateIsAtTop);
});
</script>
