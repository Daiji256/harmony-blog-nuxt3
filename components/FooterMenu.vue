<template>
  <footer>
    <div class="copyright">
      <AdjustText text="&copy; 2022 Daiji256" />
    </div>
    <div class="links">
      <div class="link">
        <NuxtLink to="/privacy-policy/">
          <AdjustText text="プライバシーポリシー" />
        </NuxtLink>
      </div>
      <div class="link">
        <a target="_blank" rel="noopener" href="https://example.com/">
          <AdjustText text="お問い合わせ" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

footer {
  @extend .font-label-large;
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
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

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
