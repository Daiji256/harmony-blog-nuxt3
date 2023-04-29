const getBaseUrl = () => {
  const environment = process.env.APP_MODE;

  switch (environment) {
    case "production":
      return "/harmony-blog-nuxt3/";
    default:
      return "/";
  }
};

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    baseURL: getBaseUrl(),
  },
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
      siteName: "Harmony Blog",
      limitPerPage: 10,
    },
  },
})
