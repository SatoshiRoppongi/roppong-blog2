// import elementPlus from "./plugins/elementPlus";

const baseUrl: string = process.env.BASE_URL || 'a'

// const domain = baseUrl.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // ssr: true,
    runtimeConfig: {
        // ctfCdaAccessToken: process.env.CTF_CDA_ACCESS_TOKEN ?? "",
        public: {
            ctfCdaAccessToken: process.env.CTF_CDA_ACCESS_TOKEN ?? "",
            ctfSpaceId: process.env.CTF_SPACE_ID ?? "",
        },
        node_env: process.env.NODE_ENV
    },
    typescript: {
        shim: false,
        strict: true,
        typeCheck: true,
    },
    modules: [
        '@pinia/nuxt',
        '@element-plus/nuxt',
        'nuxt-simple-sitemap',
        '@nuxtjs/google-adsense'
    ],
    css: ['/assets/style.css'],
    sitemap: {
        hostname: 'https://www.roppong.com',
    },
    'google-adsense': {
        id: process.env.GA_ADSENSE_ID,
        pageLevelAds: false,
        analyticsUacct: process.env.GA_TRACKING_ID, // アナリティクスと連携する場合のみ必要
        // analyticsDomainName: domain, // アナリティクスと連携する場合のみ必要
    }
})
