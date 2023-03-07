<script setup lang="ts">
import { useContentfulStore } from "~~/stores/contentful"

const { $mdRenderer } = useNuxtApp()
const route = useRoute()

const { getContentsSummaries, groupByYearMonth, store, getBlogPosts, getBlogPostsRange, getBlogPostsFilteredByCategory, getBlogPostsFilteredByYearMonth} = useContentfulStore()

const blogPost = getBlogPosts.find(post => post.slug === route.params.slug)

onMounted(() => {
})
</script>
<template>
    <h1 class="title">
        {{ blogPost?.title }}
    </h1>
    <div>
        記事カテゴリ: {{ blogPost?.categoryName }}
    </div>
    <div>
        投稿日: {{ blogPost?.createdAt?.YearMonthDayJP}}
    </div>
    <div>
        更新日: {{ blogPost?.updatedAt?.YearMonthDayJP}}
    </div>
    <el-image :src="blogPost?.eyecatchUrl" lazy />
    <div>
        <div v-html="$mdRenderer.render(blogPost?.body || '')" />
    </div>
</template>