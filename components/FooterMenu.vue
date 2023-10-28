<template>
  <footer>
    <div class="copyright">
      <AdjustText v-bind:text="copyright" />
    </div>
    <div class="links">
      <div class="link">
        <NuxtLink to="/privacy-policy">
          <AdjustText v-bind:text="privacyPolicy" />
        </NuxtLink>
      </div>
      <div class="link">
        <a target="_blank" rel="noopener" v-bind:href="contactUrl">
          <AdjustText v-bind:text="contact" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  font: $font-label-large;
  display: flex;
  bottom: 0;
  margin: 0 auto;
  padding: 8px 16px;
  width: min(100%, $screen-wrapper-max);
  min-height: $footer-height;

  .copyright {
    margin-right: 32px;
  }

  .links {
    margin-left: auto;

    .link {
      display: block;
      margin-bottom: 12px;

      a {
        text-decoration: none;
        color: inherit;
        -webkit-tap-highlight-color: $color-transparent;

        @media (hover: hover) {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
const _appConfig = useAppConfig();
const _strings = _appConfig['strings'];
const _urls = _appConfig['urls'];
const copyright = _strings.footerCopyright;
const privacyPolicy = _strings.footerPrivacyPolicy;
const contact = _strings.footerContact;
const contactUrl = _urls.contact;
</script>
