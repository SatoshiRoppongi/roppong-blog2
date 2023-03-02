import type { RouterOptions } from '@nuxt/schema'
import { RouterOptions as VueRouterOptions } from "vue-router";

export default <RouterOptions> {
  routes(_routes: VueRouterOptions['routes']) {
    // /blog/category/technologyなどへのアクセスは
    // ~/pages/blog/index.vueで処理する
    // 下記若干冗長なのでもっとスマートに書きたい
    return [..._routes, {
      path: '/blog/category/:slug',
      component: () => import('~/pages/blog/index.vue')
    }, {
      path: '/blog/archive/:slug',
      component: () => import('~/pages/blog/index.vue')
    }, 
      {
      path: '/blog/page/:slug',
      component: () => import('~/pages/blog/index.vue')
    },
      {
      path: '/blog/:group/:subgroup/page/:number',
      component: () => import('~/pages/blog/index.vue')
    }
    ];
  }
}