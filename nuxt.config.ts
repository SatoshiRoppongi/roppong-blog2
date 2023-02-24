import { processExpression } from "@vue/compiler-core";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        ctfCdaAccessToken: process.env.CTF_CDA_ACCESS_TOKEN ?? "",
        public: {
            ctfSpaceId: process.env.CTF_SPACE_ID ?? "",
        }
    },
    typescript: {
        shim: false,
        strict: true,
        typeCheck: true,
    },
    modules: [
        '@pinia/nuxt',
    ],
})
