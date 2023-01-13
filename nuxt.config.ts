export default defineNuxtConfig({
	css: ['modern-css-reset'],
	modules: ['@nuxt/content'],
	runtimeConfig: {
		public: {
			siteName: 'Kumi Blog',
			siteDescription: 'Description',
			baseUrl: 'https://example.com',
			pickupPosts: ['/posts/dummy01', '/posts/dummy02', '/posts/dummy03'],
		}
	},
})
