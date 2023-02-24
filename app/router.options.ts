import type { RouterOptions } from '@nuxt/schema'
import { RouterOptions as VueRouterOptions } from "vue-router";

export default <RouterOptions> {
  routes(_routes: VueRouterOptions['routes']) {
    // /blog/category/technologyなどへのアクセスは
    // ~/pages/blog/index.vueで処理する
    return [..._routes, {
      path: '/blog/category/:slug',
      component: () => import('~/pages/blog/index.vue')
    },
    ];
  }
}