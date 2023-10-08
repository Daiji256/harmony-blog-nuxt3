export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    baseURL: "/",
  },
  css: ["modern-css-reset"],
  modules: ["@nuxt/content", "@nuxtseo/module"],
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
});
