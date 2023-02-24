import { useContentfulStore } from "~/stores/contentful";

export default defineNuxtRouteMiddleware(async () => {
    const { store, getCategories } = useContentfulStore()
    if(!store.categories) await getCategories()
});