import { EntryCollection } from 'contentful'
import {defineStore} from 'pinia'
import { CONTENT_TYPE, IBlogPostFields, ICategoryFields } from '~~/@types/generated/contentful'

export type EntryTitleList = {
    title: string,
    slug: string,
    createdAt: string
}[]
type Contents<T> = {
[K in CONTENT_TYPE]: EntryCollection<T> | null
};

export const useContentfulStore = defineStore('contents', () => {
    /**
     * State
     */

    const store = reactive<Contents<IBlogPostFields|ICategoryFields>>({
        // todo: もっと簡潔に書けないか
    blogPost: null,
    blogPostImage: null,
    category: null,
    generalPage: null,
    layout: null,
    layoutCopy: null,
    layoutHeroImage: null,
    layoutHighlightedCourse: null,
    lesson: null,
    lessonCodeSnippets: null,
    lessonCopy: null,
    lessonImage: null
})
    /**
     * Getters
     */

    // todo: 以下getterは共通化可能。共通化する　

    const getContentsSummaries = computed(() => (contentType: CONTENT_TYPE, length?: number) => {
        const key: keyof Contents<IBlogPostFields | ICategoryFields> = contentType
        if (store[key] === null) {
            return [];
        } else {
            return store[contentType]?.items.map((entry) => {
                return {
                    title: entry.fields.title,
                    slug: entry.fields.slug,
                    createdAt: entry.sys.createdAt
                }
            }).slice(0, length)
        }
    })


    /**
     * Actions
     * contentfulからのデータを取得する
     */
    const { $contentfulClient } = useNuxtApp()
    const getContents = async (contentType: CONTENT_TYPE) => {
        const entries = await $contentfulClient.getEntries<IBlogPostFields|ICategoryFields>({
            content_type: contentType,
            order: '-sys.createdAt',
        })

        store[contentType] = entries
    }

    return { store, getContentsSummaries, getContents }

    
})