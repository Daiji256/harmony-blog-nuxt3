export default defineNuxtConfig({
  app: { pageTransition: { name: "page", mode: "out-in" } },
  css: ["modern-css-reset"],
  modules: ["@nuxt/content"],
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
      siteName: "Kumi Blog",
      limitPerPage: 10,
    },
  },
})
