<script setup lang="ts">
import { useContentfulStore } from "~~/stores/contentful"


const { categoryTitleList } = useContentfulStore()

console.log(categoryTitleList)
const route = useRoute()
const currentPage =  route.path.split('/')[3] || 'blog'

const categoryTitle = categoryTitleList.filter((category) => category.slug === currentPage)
const h1Text = !categoryTitle.length ? '新着記事一覧' : `${categoryTitle[0].title}に関する記事`

</script>
<template>
    <section class="h1text">
        {{ h1Text }}
    </section>
</template>
<style scoped>
.h1text {
    text-align: center;
}
</style>