import { file } from '@babel/types'
import { Entry, EntryCollection, Asset } from 'contentful'
import {defineStore} from 'pinia'
import { IEntry, CONTENT_TYPE, IBlogPost, IBlogPostFields, IBlogPostImageFields, ICategory, ICategoryFields } from '~~/@types/generated/contentful'

export type EntryTitleList = {
    title?: string,
    slug?: string,
    count?: number,
    createdAt?: string, // :Date
    updatedAt?: string,
}[]

export type DateFormat = {
    YearMonthJP: string,
    YearMonthDayJP: string,
    YYYYMM: string
}

export type BlogPost = {
    title?: string
    slug?: string
    metaDescription?: string
    createdAt?: DateFormat
    updatedAt?: DateFormat
    categoryName?: string
    categorySlug?: string
    eyecatchUrl?: string
    eyecatchAlt?: string
    body: string

}

type ExtraInfo<T> = {
    sys: {
        contentType: {
            sys: {
                id: T
            }
        }
    }
}
type Optional = "stringifySafe" |  "toPlainObject" | "update" 

// T1: content_type
// T2: IEntry
type ExtractContentType<T1, T2> = T2 extends ExtraInfo<T1> ? FlattenEntry<T2> : never

type Contents = {
    [K in CONTENT_TYPE]: Omit<EntryCollection<ExtractContentType<K, IEntry>>, Optional> | undefined
};

type IsRibbit = {
    isRibbit: boolean
};

type ContentsExtended = Contents & IsRibbit;

type FlattenEntry<T> = T extends Entry<infer U> ? U : never;

// type GetContentsSummaries = (contentType: CONTENT_TYPE, length?: number | undefined) => EntryTitleList | undefined

export const useContentfulStore = defineStore('contents', () => {
    /**
     * State
     */

    const store = reactive<ContentsExtended>({
        // todo: もっと簡潔に書けないか
        blogPost: undefined,
        blogPostImage: undefined,
        category: undefined,
        generalPage: undefined,
        layout: undefined,
        layoutCopy: undefined,
        layoutHeroImage: undefined,
        layoutHighlightedCourse: undefined,
        lesson: undefined,
        lessonCodeSnippets: undefined,
        lessonCopy: undefined,
        lessonImage: undefined,
        isRibbit: true
    })
    // const isRibbit = ref(true)

    
    /**
     * Getters
     */

    // todo: 以下getterは共通化可能。共通化する　

    const getContentsSummaries = computed(() => (contentType: "blogPost" | "category", length?: number): EntryTitleList | undefined => {
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
                metaDescription: entry.fields.metaDescription,
                slug: entry.fields.slug,
                createdAt: dateStringToPretty(entry.sys.createdAt),
                updatedAt: dateStringToPretty(entry.sys.updatedAt),
                categoryName: getCategoryFromId.value(entry.fields.category?.sys.id || '').categoryName,
                categorySlug: getCategoryFromId.value(entry.fields.category?.sys.id || '').categorySlug,
                eyecatchUrl: `https:${getEyecatchUrlId.value(entry.fields.images?.sys.id || '') || '//picsum.photos/900/300/?random='+Math.random()}`,
                eyecatchAlt: entry.fields.images ? entry.fields.images?.fields.description : 'random eye catch image',
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
        return filteredPost

    })

    // getBlogPostsFilteredByCategory と共通化できそう
    const getBlogPostsFilteredByYearMonth = computed(() => (yyyymm: string) => {
        return getBlogPosts.value.filter(post => post.createdAt?.YYYYMM === yyyymm)
    })

    const getCategoryFromId = computed(() => (id: string) => {
        const categoryName =  store.category?.items.find(item => item.sys.id === id)?.fields.title
        const categorySlug = store.category?.items.find(item => item.sys.id === id)?.fields.slug
        return {categoryName, categorySlug}
    })

    const getEyecatchUrlId = computed(() => (id: string) => {
        const url = store.blogPost?.includes.Asset.find((asset: Asset) => asset.sys.id === id)?.fields.file.url
        return url
    })

    const numOfCategory = computed(() => (categoryString: string | undefined) => {
        return store.blogPost?.items.filter((obj: Entry<IBlogPostFields>) => {
           return obj.fields.category?.fields.slug === categoryString
        }).length || 0
    })

    // store.blogPostImageのgetter
    const getBlogPostImage = computed(() => {
        console.log('tettest')
        console.log(store.blogPostImage?.items)
        return [
            'https:' + store.blogPostImage?.items[0].fields.image?.fields.file.url,
            'https:' + store.blogPostImage?.items[1].fields.image?.fields.file.url
        ]
    })

    // サイドバーのアーカイブで利用
    const groupByYearMonth = computed(() => (contentType: "blogPost" | "category", length?: number) => {
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
    const dateStringToPretty = (dateString: string): DateFormat => {
        // [YYYY, MM]
        const YearMonthDay = dateString.split('T')[0].split('-')
        // YYYY年MM月
        const YearMonthJP = `${YearMonthDay && YearMonthDay[0]}年${YearMonthDay && YearMonthDay[1]}月`
        // YYYY年MM月DD日
        const YearMonthDayJP = `${YearMonthJP}${YearMonthDay && YearMonthDay[2]}日`
        // YYYYMM for slug
        const YYYYMM= YearMonthDay?.slice(0,2).join('')
        return {
            YearMonthJP,
            YearMonthDayJP,
            YYYYMM
        }
    }

    const toRibbit = (htmlString: string) => {

        let replacedHtmlString = ''

        const ribbitDict = [
            'ribbit',
            'Ribbit!',
            'RIBBIT',
            'rrrrrr',
            'rbbbbb',
            'ririririri',
            'ribbit?',
            '?????',
            'f*ckin',
            '!!!!',
            'rr',
            'rb',
            "m('~')m"
        ]


        // 一時的な要素を作成してHTML文字列を挿入
        if (typeof document !== 'undefined') {
        const tempElement = document.createElement("div");
        const numOfString = htmlString.length / 1000
        tempElement.innerHTML = htmlString;

        // テキストノードを "ribbit" に置換
        function replaceNonTagTextWithRibbit(element: any) {

            if (element.nodeType === Node.TEXT_NODE) {
                let ribbitString = ''
                for (let i = 0; i < numOfString; i++) {
                    ribbitString += ribbitDict[Math.floor(Math.random() * ribbitDict.length)] + ' '

                }
                element.textContent = ribbitString;
            } else {
                for (let i = 0; i < element.childNodes.length; i++) {
                    replaceNonTagTextWithRibbit(element.childNodes[i]);
                }
            }
        }

        // テキストノードの置換を実行
        replaceNonTagTextWithRibbit(tempElement);
        replacedHtmlString = tempElement.innerHTML;

        }

        // 置換後のHTML文字列を取得

        return replacedHtmlString;

    }


    /**
     * Actions
     * contentfulからのデータを取得する
     */
    const { $contentfulClient } = useNuxtApp()
    const getContents = async (contentType: CONTENT_TYPE) => {
        const entries  = await $contentfulClient.getEntries<ExtractContentType<CONTENT_TYPE, Omit<IEntry, Optional>>>({
            content_type: contentType,
            order: '-sys.createdAt',
        }) || undefined

        // entriesがnever型になっているのが気になる。。
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
        getBlogPostImage,
        toRibbit,
        getContents
    }

    
})