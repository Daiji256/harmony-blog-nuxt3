export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@nuxt/content", "@nuxt/image", "@nuxtseo/module"],
  css: ["@/assets/scss/main.scss"],
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
    url: "https://harmony-blog-nuxt3.pages.dev",
    name: "Harmony Blog"
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
      rehypePlugins: ["rehype-latex2mathml", "rehype-quotes", "rehype-adjust-aki", "rehype-custom-image"],
      anchorLinks: false,
    },
    highlight: {
      theme: 'github-light',
      preload: ["c", "js"],
    },
  },
});
