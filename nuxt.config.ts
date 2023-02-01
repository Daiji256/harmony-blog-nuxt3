export default defineNuxtConfig({
	app: { pageTransition: { name: 'page', mode: 'out-in' } },
	css: ['modern-css-reset'],
	modules: ['@nuxt/content'],
	content: {
		markdown: {
			rehypePlugins: ['rehype-quotes', 'rehype-adjust-aki']
		}
	},
	runtimeConfig: {
		public: {
			siteName: 'Kumi Blog',
		}
	},
})
