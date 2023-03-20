// import { createClient } from "contentful";

// import { ContentfulClientApi } from "contentful";

import * as contentful from 'contentful'
import { ContentfulClientApi } from 'contentful';
// const contentful = require('contentful');


export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();

    const paramObj = {
        space: config.public.ctfSpaceId,
        accessToken: config.public.ctfCdaAccessToken,
    }

    // todo: defaultの箇所でエラーになる. 下記は根本的な解決ではないので修正する
    // @ts-ignore
    const client: ContentfulClientApi = contentful.createClient ? contentful.createClient(paramObj) : contentful.default.createClient(paramObj)



    return {
        provide: {
            contentfulClient: client,
        },
    };
});