import { getTokenSourceMapRange } from "typescript";
import { useContentfulStore } from "~/stores/contentful";

export default defineNuxtRouteMiddleware(async () => {
    const { store, getPosts, getCategories } = useContentfulStore()
    if(!store.categories) await getCategories()
    if(!store.posts) await getPosts()
});