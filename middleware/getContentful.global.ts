import { useContentfulStore } from "~/stores/contentful";
import { CONTENT_TYPE } from "~~/@types/generated/contentful";

export default defineNuxtRouteMiddleware(async () => {
    const { store, getContents } = useContentfulStore()
    const contentTypeBlogPost: CONTENT_TYPE | undefined = 'blogPost' // process.env.CTF_BLOG_POST_TYPE_ID
    const contentTypeCategory: CONTENT_TYPE = 'category'
    if(!store.blogPost) await getContents(contentTypeBlogPost)
    if(!store.category) await getContents(contentTypeCategory)
});