import { createClient } from "contentful";
// import contentful from 'contentful'
// import * as dotenv from 'dotenv'

// import 'dotenv/config'

// dotenv.config()

// todo: typeScriptで型チェックを行うように修正する
// https://scrawledtechblog.com/next-js-typescript-contentful/
// -> 「Contentfulと通信要のutilsを作成する」

export default defineNuxtPlugin((nuxtApp) => {
     const config = useRuntimeConfig();
    // const createClientFunc = process.env.NODE_ENV === 'dev' ? createClient : createClient // : contentful.createClient
    // const createClientFunc = config.node_env === 'prod' ? createClient : contentful.createClient
    /*
    const client = createClient({
        space: process.env.CTF_SPACE_ID || "",
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN || "",
    })
    */



    const client = createClient({
        space: config.public.ctfSpaceId,
        accessToken: config.public.ctfCdaAccessToken,
    });

    return {
        provide: {
            contentfulClient: client,
        },
    };
});