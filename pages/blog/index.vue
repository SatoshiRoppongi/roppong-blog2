<script setup lang="ts">
import { CONTENT_TYPE } from "~~/@types/generated/contentful"
import { useContentfulStore } from "~~/stores/contentful"

// getcontentsSummariesとgetBlogPostsは統合できるのでは？もっというとstoreも
const { getContentsSummaries, groupByYearMonth, store, toRibbit, getBlogPosts, getBlogPostsRange, getBlogPostsFilteredByCategory, getBlogPostsFilteredByYearMonth} = useContentfulStore()

const route = useRoute()

const pathParts = route.path.split('/')
const groupType = pathParts[2] // archive or category
const currentSlug = pathParts[3] || 'blog'

const contentType: CONTENT_TYPE = 'category'


// categoryを表示するときはarchive, archiveを表示するときはcategoryのタイトルは取得する必要がないので、下記一方は無駄な計算。
// todo: 無駄な計算をしないように修正する
const categoryTitle = getContentsSummaries(contentType)?.filter((category) => category.slug === currentSlug) 
const yyyymmTitle = groupByYearMonth('blogPost').filter((yyyymm) => yyyymm.slug === currentSlug)
const h1Text = groupType === 'category' ? `${categoryTitle && categoryTitle[0]?.title}に関する記事` :
    groupType === 'archive' ? `${yyyymmTitle && yyyymmTitle[0]?.title}の投稿` : '新着記事一覧'


const pageSize = ref(10) // 1ページあたりに表示する記事の数
const lastSlug = pathParts.slice(-2)[1] 
const beforeLastSlug = pathParts.slice(-2)[0]
const currentPage = ref(beforeLastSlug == 'page' && !isNaN(parseInt(lastSlug)) ? parseInt(lastSlug) : 1) // 現在のページ数を取得する。（正確ではない気がする)
// const currentPage = ref(1)

const itemNoFrom = pageSize.value * (currentPage.value - 1) + 1
const itemNoTo = itemNoFrom + pageSize.value -1

// todo: blogPosts自体はサイズ取得しかしていのに、実際のオブジェクトを取得しているのは無駄。改善する
const blogPosts = groupType === 'category' ? getBlogPostsFilteredByCategory(currentSlug) :
    groupType === 'archive' ? getBlogPostsFilteredByYearMonth(yyyymmTitle[0].slug || '') : getBlogPosts

const blogPostsRange = getBlogPostsRange(blogPosts, itemNoFrom, itemNoTo)

function updateCurrentPage(val: number) {

    let pathStr: string = ""

    if (val === 1) {
        // 1ページ目だったら、/page/* を取り除く
        pathStr = pathParts.slice(0, -2).join('/')
    } else {
        // slugに 'page' を含む場合は、
        const pIndex = pathParts.findIndex(str => str === 'page')
        if (pIndex === -1) {
            // slug に 'page' を含まない場合は、1ページ目なので、単純に、page/* を付け加える
            pathStr = `${pathParts.join('/')}/page/${val}`
        } else {
            // slugに 'page' を含む場合は、page/* を取り除いて、/page/* を付け加える
            // pathStr = `${pathParts.slice(0, pIndex + 1).join('/')}/${val}` でもいいかも
            pathStr = `${pathParts.slice(0, pIndex).join('/')}/page/${val}`
        }
    }
    // トレイリングスラッシュの除去
    pathStr = pathStr.replace('//', '/')

    return navigateTo({
        path:  `${pathStr}`
    })
}

useHead({
    title: `roppong blog - ${h1Text}`,
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: '趣味のランニング・日々勉強になったこと・面白いと思ったことを中心に、みなさまのお役に立つかもしれない情報を発信しています。',
        },
    ],
}
)

</script>
<template>
    <div class="body">
        <h1 class="h1Text">
            <el-icon>
                <component v-bind:is="$iconComponent(lastSlug)" />
            </el-icon>
            {{ store.isRibbit ? toRibbit(h1Text || '') : h1Text }}
            <el-tag size="large"> {{ blogPostsRange.length }}件</el-tag>
        </h1>
        <div class="card" v-for="(blogPost, i) in blogPostsRange" :key="i">
            <ArticleCard :blogInfo="blogPost"/>
        </div>
        <div class="pagination-block">
            <el-pagination 
                layout="prev, pager, next"
                :total="blogPosts?.length || 1"
                :current-page="currentPage"
                @update:current-page="updateCurrentPage"
                background
            />
        </div>
        <template>
        <!--
          <adsbygoogle ad-slot="7309254084" />
        -->
        </template>
    </div>
</template>
<style scoped>

.pagination-block {
    margin: 0 auto;
    width: 200px

}

.body {
    width: auto;
}
.card {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>