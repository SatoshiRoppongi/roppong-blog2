import { Entry, EntryCollection } from 'contentful'
import store from 'element-plus/es/components/table/src/store'
import {defineStore} from 'pinia'
import { CONTENT_TYPE, IBlogPost, IBlogPostFields, ICategory, ICategoryFields } from '~~/@types/generated/contentful'

export type EntryTitleList = {
    title?: string,
    slug?: string,
    count?: number,
    createdAt?: string // :Date
}[]
type Contents<T> = {
[K in CONTENT_TYPE]: EntryCollection<T> | null
};

// type GetContentsSummaries = (contentType: CONTENT_TYPE, length?: number | undefined) => EntryTitleList | undefined

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

    const getContentsSummaries = computed(() => (contentType: CONTENT_TYPE, length?: number): EntryTitleList | undefined => {
        const key: keyof Contents<IBlogPostFields | ICategoryFields> = contentType
        return store[contentType]?.items.map((entry) => {
            return {
                title: entry.fields.title,
                slug: entry.fields.slug,
                count: contentType === 'category' ? numOfCategory.value(entry.fields.slug) : undefined,
                createdAt: entry.sys.createdAt // new Date(entry.sys.createdAt)
            }
        }).slice(0, length)
    })

    // below code is not works
    const numOfCategory = computed(() => (category: string | undefined) => {
        return store.blogPost?.items.filter((obj: any) => { obj.fields.category?.fields.slug === category }).length || 0
    })

    // サイドバーのアーカイブで利用
    const groupByYearMonth = computed(() => (contentType: CONTENT_TYPE, length?: number) => {
        const blogPostEntries = getContentsSummaries.value(contentType, length)
        const retArray: EntryTitleList = []
        blogPostEntries?.forEach((obj) => { 
            // [YYYY, MM]
            const YearMonth = obj.createdAt?.split('-').slice(0,2)
            // YYYY年MM月
            const YearMonthJP = `${YearMonth && YearMonth[0]}年${YearMonth && YearMonth[1]}月`
            // YYYYMM for slug
            const YYYYMM= YearMonth?.join('')
            const YearMonthObj = retArray.find((obj) => obj.slug === YYYYMM)
            if (YearMonthObj) {
                YearMonthObj.count && YearMonthObj.count++
            } else {
                retArray.push(
                    {
                        title: YearMonthJP,
                        slug: YYYYMM,
                        count: 1
                    }
                )
            }
        })
        return retArray
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

    return { store, getContentsSummaries, groupByYearMonth, getContents }

    
})