<script setup lang="ts">
import { ContentType } from "contentful"
import { CONTENT_TYPE } from "~~/@types/generated/contentful"
import { useContentfulStore } from "~~/stores/contentful"
/*
import { ID_INJECTION_KEY } from "element-plus";

provide(ID_INJECTION_KEY, {
    prefix: 200,
    current: 0
})
*/


const { getContentsSummaries, groupByYearMonth, store} = useContentfulStore()

const route = useRoute()

const pathParts = route.path.split('/')
const groupType = pathParts[2] // archive or category
const currentSlug = pathParts[3] || 'blog'

const contentType: CONTENT_TYPE = 'category'


// categoryを表示するときはarchive, archiveを表示するときはcategoryのタイトルは取得する必要がないので、下記一方は無駄な計算。
// todo: 無駄な計算をしないように修正する
const categoryTitle = getContentsSummaries(contentType)?.filter((category) => category.slug === currentSlug) 
const yyyymmTitle = groupByYearMonth('blogPost').filter((yyyymm) => yyyymm.slug === currentSlug)
const h1Text = groupType === 'category' ? `${categoryTitle && categoryTitle[0].title}に関する記事` :
    groupType === 'archive' ? `${yyyymmTitle && yyyymmTitle[0].title}の投稿` : '新着記事一覧'

const blogPost = store.blogPost

const pageSize = ref(10) // 1ページあたりに表示する記事の数
const lastSlug = pathParts.slice(-2)[1] 
const beforeLastSlug = pathParts.slice(-2)[0]
// const currentPage = beforeLastSlug == 'page' && !isNaN(parseInt(lastSlug)) ? parseInt(lastSlug) : 1 // 現在のページ数を取得する。（正確ではない気がする)
const currentPage = ref(1)

function handleCurrentChanged(val: number) {
    // この関数が何故か呼ばれない。原因を調査する。下記が関係している？
    // https://stackoverflow.com/questions/68956130/current-page-currentpage-attribute-from-el-pagination-in-element-plus-is-not-wor
    console.log('pagepage')
    console.log(val)
    currentPage.value = val
    /*
    return navigateTo({
        path:  `${route.path}/page/${toPage}`
    })
    */
}

function handlePageSizeChanged(val: number) {
    pageSize.value = val
}


/*
watchEffect(() => {
    console.log('testsetest')
    console.log(currentPage)

})
*/

/*
watch([() => currentPage], ([nPage], [oPage]) => {
    console.log('bbbbbbbb')
    console.log(nPage)
    console.log(oPage)
    if (nPage !== oPage) {
        console.log('aaaaaaaaaaaaaa')
    }
})
*/
</script>
<template>
    <div>
        <div class="h1Text">
            {{ h1Text }}
        </div>
        <div v-for="i in blogPost?.total" :key="i">
            <ArticleCard />
        </div>
        <!-- <div class="pagination-block"> -->
            <el-pagination 
                layout="prev, pager, next"
                :total="blogPost?.total"
                :page-size="10"
                :current-page="currentPage"
                @update:current-page="handleCurrentChanged"
            />
            {{ currentPage }}
        <!-- </div> -->
    </div>
</template>
<style scoped>

.h1Text {
    text-align: center;
}

/*
.pagination-block {
    margin: 0 auto;
    width: 200px

}
*/
</style>