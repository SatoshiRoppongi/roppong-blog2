import { EntryCollection } from 'contentful'
import {defineStore} from 'pinia'
import { IBlogPostFields, ICategoryFields } from '~~/@types/generated/contentful'

type CategoryTitleList = {
    title: string,
    slug: string,
}[]

export const useContentfulStore = defineStore('contents', () => {
    /**
     * State
     */
    const store = reactive<{
        'posts': EntryCollection<IBlogPostFields> | null
        'categories': EntryCollection<ICategoryFields> | null
    }>({
        'posts': null,
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
    const { $contentfulClient } = useNuxtApp()
    const getPosts = async () => {
        const posts = await $contentfulClient.getEntries<IBlogPostFields>({
            content_type: process.env.CTF_BLOG_POST_TYPE_ID,
            order: '-sys.createdAt',
        })
        console.log('test')
        console.log(posts)
        store.posts = posts
    }

    const getCategories = async () => {
        const categories = await $contentfulClient.getEntries<ICategoryFields>({
            content_type: 'category',
            order: '-sys.createdAt',
        })
        store.categories = categories
    }

    return { store, categoryTitleList, getPosts, getCategories }

    
})