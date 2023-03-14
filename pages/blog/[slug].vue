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
        margin: 1em 0;
        padding: 1em;
        border-radius: 5px;
        background: #25292f;
        color: #fff;
        overflow-x:scroll;
        -webkit-overflow-scrolling: touch; 

    }
    ::v-deep p {
        line-height: 3em;
    }
    ::v-deep li {
        line-height: 2em;
    }

    ::v-deep h2 {
        margin: 3em 0;
        padding: 0.5em;/*文字周りの余白*/
        color: #494949;/*文字色*/
        background: #fffaf4;/*背景色*/
        border-left: solid 5px #ffaf58;/*左線（実線 太さ 色）*/
    }

    ::v-deep h3 {
        /*線の種類（実線） 太さ 色*/
        border-bottom: solid 3px black;
    }

    ::v-deep .table-of-contents {
        background: #f3f3f3;
        border: 1px solid #ccc;
        padding: 5px 10px;
        margin: 0 0 20px;
        width: fit-content;
        ul {
        padding-left: 24px;
        }
        &:before {
        content: '目次';
        font-weight: bold;
        font-size: 16px;
        }
    }
}

</style>
