<script setup lang="ts">
import { useContentfulStore } from "~~/stores/contentful"


const { categoryTitleList, store} = useContentfulStore()
console.log(store.posts)

console.log(categoryTitleList)
const route = useRoute()
const currentPage =  route.path.split('/')[3] || 'blog'

const categoryTitle = categoryTitleList.filter((category) => category.slug === currentPage)
// todo: アーカイブも実装する ** の投稿
const h1Text = !categoryTitle.length ? '新着記事一覧' : `${categoryTitle[0].title}に関する記事`

</script>
<template>
    <div>
        <div class="h1Text">
            {{ h1Text }}
        </div>
        {{ store.posts }}
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