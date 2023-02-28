<script setup lang="ts">
import { ContentType } from "contentful"
import { CONTENT_TYPE } from "~~/@types/generated/contentful"
import { useContentfulStore } from "~~/stores/contentful"


const { getContentsSummaries, groupByYearMonth, store} = useContentfulStore()

const route = useRoute()

const pathParts = route.path.split('/')
const groupType = pathParts[2] // archive or category
const currentPage = pathParts[3] || 'blog'

const contentType: CONTENT_TYPE = 'category'


// categoryを表示するときはarchive, archiveを表示するときはcategoryのタイトルは取得する必要がないので、下記一方は無駄な計算。
// todo: 無駄な計算をしないように修正する
const categoryTitle = getContentsSummaries(contentType)?.filter((category) => category.slug === currentPage) 
const yyyymmTitle = groupByYearMonth('blogPost').filter((yyyymm) => yyyymm.slug === currentPage)
const h1Text = groupType === 'category' ? `${categoryTitle && categoryTitle[0].title}に関する記事` :
    groupType === 'archive' ? `${yyyymmTitle && yyyymmTitle[0].title}の投稿` : '新着記事一覧'

</script>
<template>
    <div>
        <div class="h1Text">
            {{ h1Text }}
        </div>
        <div v-for="i in 10" :key="i">
            <ArticleCard />
        </div>
        <div class="pagination-block">
            <el-pagination layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>
<style scoped>

.h1Text {
    text-align: center;
}

.pagination-block {
    margin: 0 auto;
    width: 200px

}
</style>