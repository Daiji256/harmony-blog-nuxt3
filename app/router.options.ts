/**
 * This source code is partially modified from
 * https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/runtime/router.options.ts
 *
 * TODO: Transition to `scroll-margin-top` implementation.
 */

import type { RouteLocationNormalized, RouterScrollBehavior } from '#vue-router'
import { nextTick } from 'vue'
import type { RouterConfig } from 'nuxt/schema'
import { useNuxtApp } from '#app/nuxt'
import { useRouter } from '#app/composables/router'
// @ts-expect-error virtual file
import { appPageTransition as defaultPageTransition } from '#build/nuxt.config.mjs'

type ScrollPosition = Awaited<ReturnType<RouterScrollBehavior>>

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    // @ts-expect-error untyped, nuxt-injected option
    const behavior = useRouter().options?.scrollBehaviorType ?? 'auto'
    let position: ScrollPosition = savedPosition || undefined
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === 'function' ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop
    if (!position && from && to && routeAllowsScrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 }
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 }
      }
      if (to.hash) {
        // Fixed header height; SCSS-based theme settings will not be applied.
        return { el: to.hash, top: 64, behavior }
      }
    }
    const hasTransition = (route: RouteLocationNormalized) => !!(route.meta.pageTransition ?? defaultPageTransition)
    const hookToWait = (hasTransition(from) && hasTransition(to)) ? 'page:transition:finish' : 'page:finish'
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick()
        if (to.hash) {
          // Fixed header height; SCSS-based theme settings will not be applied.
          position = { el: to.hash, top: 64, behavior }
        }
        resolve(position)
      })
    })
  }
}

function _isDifferentRoute(from: RouteLocationNormalized, to: RouteLocationNormalized) {
  return to.path !== from.path || JSON.stringify(from.params) !== JSON.stringify(to.params);
}
