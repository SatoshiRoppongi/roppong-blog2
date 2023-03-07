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
    <div>
        <div v-html="$mdRenderer.render(blogPost?.body || '')" />
    </div>
</template>