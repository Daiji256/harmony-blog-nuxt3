export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    baseURL: process.env.NODE_ENV === "production" ? "/harmony-blog-nuxt3" : "/",
  },
  css: ["modern-css-reset"],
  modules: [
    "@nuxt/content",
    "@nuxtjs/i18n",
    "nuxt-og-image",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
  site: {
    url: "https://daiji256.github.io/harmony-blog-nuxt3",
  },
  ogImage: {
    defaults: {
      component: "OgImage",
    },
    fonts: [
      {
        name: "Glow Sans J",
        path: "fonts/GlowSansJ/GlowSansJ-Normal-Medium-SS-TG.ttf",
        weight: 500,
      },
    ],
  },
  content: {
    markdown: {
      remarkPlugins: ["remark-math"],
      rehypePlugins: ["rehype-latex2mathml", "rehype-quotes", "rehype-adjust-aki"],
    },
    highlight: {
      theme: 'github-light',
      preload: ["c", "js"],
    },
  },
  runtimeConfig: {
    public: {
      siteName: "Harmony Blog",
      postsTitle: "すべての投稿",
      postsDescription: "投稿一覧です。",
      tagsTitle: "すべてのタグ",
      tagsDescription: "全ての投稿のタグ一覧です。",
      tagPageDescription: "の投稿の投稿一覧です。",
      limitPerPage: 10,
    },
  },
  i18n: {
    /**
     * Warning: You are using an i18n library,
     * but the source code lacks adequate implementation for multilingual support.
     * Code modifications are necessary to achieve full language compatibility.
     */
    locales: ["ja"],
    defaultLocale: "ja",
    vueI18n: "i18n/i18n.config.ts",
  },
});
