import type { RouterOptions } from '@nuxt/schema'
import { RouterOptions as VueRouterOptions } from "vue-router";

export default <RouterOptions> {
  routes(_routes: VueRouterOptions['routes']) {
    // todo カテゴリを取得して動的に入れる
    // スプレッド構文で入れる？
    return [..._routes, {
      path: '/blog/category/technology',
      component: () => import('~/pages/blog/index.vue')
    }, {
      path: '/blog/category/review',
      component: () => import('~/pages/blog/index.vue')
    }
    ];
  }
}