import { EntryCollection } from 'contentful'
import {defineStore} from 'pinia'
import { ICategoryFields } from '~~/@types/generated/contentful'

type CategoryTitleList = {
    title: string,
    slug: string,
}[]

export const useContentfulStore = defineStore('contents', () => {
    /**
     * State
     */
    const store = reactive<{ 'categories': EntryCollection<ICategoryFields> | null}>({
        'categories' : null,
    })
    /**
     * Getters
     */
    const categoryTitleList: ComputedRef<CategoryTitleList> = computed(() => {
        if (store.categories === null) {
            return [];
        } else {
            return store.categories?.items.map((category) => { return { title: category.fields.title, slug: category.fields.slug } })
        }
    })

    /**
     * Actions
     * contentfulからのデータを取得する
     */

    const getCategories = async () => {
        const { $contentfulClient } = useNuxtApp()
        const categories = await $contentfulClient.getEntries<ICategoryFields>({
            content_type: 'category',
            order: '-sys.createdAt',
        })
        store.categories = categories
    }

    return { store, getCategories, categoryTitleList }

    
})