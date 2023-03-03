<template>
  <footer>
    <div class="copyright">&copy; 2022 Daiji256</div>
    <div class="links">
      <div class="link">
        <NuxtLink to="/privacy-policy">プライバシーポリシー</NuxtLink>
      </div>
      <div class="link">
        <a target="_blank" rel="noopener" href="https://example.com">お問い合わせ</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variable";

footer {
  @extend .font-label-medium;
  display: flex;
  bottom: 0;
  margin: 0 auto;
  padding: 8px 16px;
  width: min(100%, $screen-wrapper-max);

  .copyright {
    margin-right: 32px;
  }

  .links {
    margin-left: auto;

    .link {
      display: block;
      margin-bottom: 8px;

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
