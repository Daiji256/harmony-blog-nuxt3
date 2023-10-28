<template>
  <TopAppBar />
  <div class="wrapper">
    <AdjustText class="status-code" v-bind:text="statusCode" />
    <AdjustText class="status-message" v-bind:text="statusMessage" />
    <a class="button" href="/">
      <AdjustText class="button-content" v-bind:text="goBackHome" />
    </a>
  </div>
  <FooterMenu />
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: $top-bar-height;
  min-height: calc(100vh - $footer-height);

  .status-code {
    font: $font-display-large;
  }

  .status-message {
    font: $font-title-large;
  }

  .button {
    display: inline-block;
    margin-top: 16px;
    text-decoration: none;
    -webkit-tap-highlight-color: $color-transparent;

    @media (hover: hover) {
      &:hover {
        .button-content {
          background-color: state($color-primary, $color-on-primary, $state-hover);
          box-shadow: $my-box-shadow-level-2;
        }
      }
    }

    &:active {
      .button-content {
        background-color: state($color-primary, $color-on-primary, $state-pressed);
        box-shadow: $my-box-shadow-level-0;
      }
    }

    .button-content {
      font: $font-body-large;
      display: flex;
      align-items: center;
      border-radius: 20px;
      height: 40px;
      padding: 0 24px;
      color: $color-on-primary;
      background-color: $color-primary;
    }
  }
}
</style>

<script setup lang="ts">
type Props = { error: Object };
const { error } = defineProps<Props>();
const statusCode = 'statusCode' in error ? `${error.statusCode}` : 'Unknown Error';
const statusMessage = 'statusMessage' in error ? `${error.statusMessage}` : '';
const goBackHome = useAppConfig()['strings'].goBackHome;
</script>
