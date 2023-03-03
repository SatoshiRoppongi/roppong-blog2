// import elementPlus from "./plugins/elementPlus";

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
        '@element-plus/nuxt'
    ],
})
