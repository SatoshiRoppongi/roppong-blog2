<script setup lang="ts">
import { ContentType } from "contentful"
import { CONTENT_TYPE } from "~~/@types/generated/contentful"
import { useContentfulStore } from "~~/stores/contentful"


const { getContentsSummaries, store} = useContentfulStore()

const route = useRoute()
const currentPage =  route.path.split('/')[3] || 'blog'

const contentType: CONTENT_TYPE = 'category'


const categoryTitle = getContentsSummaries(contentType)?.filter((category) => category.slug === currentPage)
// todo: アーカイブも実装する ** の投稿
const h1Text = !categoryTitle?.length ? '新着記事一覧' : `${categoryTitle[0].title}に関する記事`

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