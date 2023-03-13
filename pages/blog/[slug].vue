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
    <h1 class="h1Text">
        {{ blogPost?.title }}
    </h1>
    <div class="info">
        記事カテゴリ
        <nuxt-link :to="`blog/category/${blogPost?.categorySlug}`" class="c-p">
            <el-tag>
            {{ blogPost?.categoryName }}
            </el-tag>
        </nuxt-link>
    </div>
    <div class="info">
        投稿日: {{ blogPost?.createdAt?.YearMonthDayJP}}
    </div>
    <div class="info" v-if="blogPost?.createdAt?.YearMonthDayJP !== blogPost?.updatedAt?.YearMonthDayJP">
        更新日: {{ blogPost?.updatedAt?.YearMonthDayJP}}
    </div>
    <el-image :src="blogPost?.eyecatchUrl" lazy class="eyecatch-img"/>
    <div>
        <div class="contents-html" v-html="$mdRenderer.render(blogPost?.body || '')" />
    </div>
</template>
<style lang="scss" scoped>
.info {
    margin-bottom: 20px;
}

.contents-html {
    ::v-deep img {
        max-width: 100%;
        height: auto;
    }

    ::v-deep pre {
        overflow-x:scroll;

    }
}

</style>
