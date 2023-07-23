export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    baseURL: process.env.NODE_ENV === "production" ? "/harmony-blog-nuxt3/" : "/",
  },
  css: ["modern-css-reset"],
  modules: ["@nuxt/content", "nuxt-simple-sitemap"],
  site: {
    url: 'https://example.com',
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
      limitPerPage: 10,
    },
  },
})
