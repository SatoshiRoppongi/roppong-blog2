import { createClient } from "contentful";
import contentful from 'contentful'

// todo: typeScriptで型チェックを行うように修正する
// https://scrawledtechblog.com/next-js-typescript-contentful/
// -> 「Contentfulと通信要のutilsを作成する」

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const createClientFunc = process.env.NODE_ENV === 'dev' ? createClient : contentful.createClient

    const client = createClientFunc({
        space: config.public.ctfSpaceId,
        accessToken: config.ctfCdaAccessToken,
    });

    return {
        provide: {
            contentfulClient: client,
        },
    };
});