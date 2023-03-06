import { file } from '@babel/types'
import { Entry, EntryCollection, Asset } from 'contentful'
import {defineStore} from 'pinia'
import { CONTENT_TYPE, IBlogPost, IBlogPostFields, ICategory, ICategoryFields } from '~~/@types/generated/contentful'

export type EntryTitleList = {
    title?: string,
    slug?: string,
    count?: number,
    createdAt?: string, // :Date
    updatedAt?: string,
}[]

export type BlogPost = {
    title?: string
    slug?: string
    createdAt?: string
    updatedAt?: string
    categoryName?: string
    categorySlug?: string
    eyecatchUrl?: string
    body: string

}
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
                createdAt: entry.sys.createdAt, // new Date(entry.sys.createdAt)
                updatedAt: entry.sys.updatedAt
            }
        }).slice(0, length)
    })

    const getBlogPosts = computed(() => {
        return store.blogPost?.items.map((entry : Entry<IBlogPostFields>): BlogPost => {
            return {
                title: entry.fields.title,
                slug: entry.fields.slug,
                createdAt: entry.sys.createdAt,
                updatedAt: entry.sys.updatedAt,
                categoryName: getCategoryFromId.value(entry.fields.category?.sys.id || '').categoryName,
                categorySlug: getCategoryFromId.value(entry.fields.category?.sys.id || '').categorySlug,
                eyecatchUrl: getEyecatchUrlId.value(entry.fields.images?.sys.id || ''),
                body: entry.fields.body || ''
            }
        }) || []

    })
    const getBlogPostsRange = computed(() => (blogPosts: BlogPost[], itemNoFrom: number, itemNoTo: number)=> {
        return blogPosts.slice(itemNoFrom - 1, itemNoTo)
    })

    // getBlogPostsFilteredByYearMonth と共通化できそう
    const getBlogPostsFilteredByCategory = computed(() => (categorySlug: string) => {
        const filteredPost =  getBlogPosts.value.filter((post) => {
            return post.categorySlug === categorySlug
        })
        console.log(filteredPost)
        return filteredPost

    })

    // getBlogPostsFilteredByCategory と共通化できそう
    const getBlogPostsFilteredByYearMonth = computed(() => (yyyymm: string) => {
        return getBlogPosts.value.filter(post => dateStringToPretty(post.createdAt || '').YYYYMM === yyyymm)
    })

    const getCategoryFromId = computed(() => (id: string) => {
        const categoryName =  store.category?.items.find(item => item.sys.id === id)?.fields.title
        const categorySlug = store.category?.items.find(item => item.sys.id === id)?.fields.slug
        return {categoryName, categorySlug}
    })

    const getEyecatchUrlId = computed(() => (id: string) => {
        const url = store.blogPost?.includes.Asset.find((asset: Asset) => asset.sys.id === id)?.fields.file.url
        return `https:${url}`
    })

    const numOfCategory = computed(() => (categoryString: string | undefined) => {
        return store.blogPost?.items.filter((obj: Entry<IBlogPostFields>) => {
           return obj.fields.category?.fields.slug === categoryString
        }).length || 0
    })

    // サイドバーのアーカイブで利用
    const groupByYearMonth = computed(() => (contentType: CONTENT_TYPE, length?: number) => {
        const blogPostEntries = getContentsSummaries.value(contentType, length)
        const retArray: EntryTitleList = []
        blogPostEntries?.forEach((obj) => { 

            const { YearMonthJP, YYYYMM } = dateStringToPretty(obj.createdAt || '')
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

    // 共通関数(plugins, composablesとかに切り出した方がいい？)
    const dateStringToPretty = (dateString: string) => {
        // [YYYY, MM]
        const YearMonth = dateString.split('-').slice(0,2)
        // YYYY年MM月
        const YearMonthJP = `${YearMonth && YearMonth[0]}年${YearMonth && YearMonth[1]}月`
        // YYYYMM for slug
        const YYYYMM= YearMonth?.join('')
        return {
            YearMonthJP,
            YYYYMM
        }
    }


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

    return {
        store,
        getContentsSummaries,
        getBlogPosts,
        getBlogPostsRange,
        getBlogPostsFilteredByCategory,
        getBlogPostsFilteredByYearMonth,
        groupByYearMonth,
        getContents
    }

    
})