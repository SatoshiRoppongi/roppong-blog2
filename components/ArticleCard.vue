<script setup lang="ts">
import { BlogPost } from '~~/stores/contentful';

const { $mdRenderer } = useNuxtApp()

const props = defineProps <{
  blogInfo: BlogPost
}>()

// イントロ部分のみ表示する
// todo: 基本は目次の直前までイントロで表示する
// 目次がない場合、ある文字数（or 行数）まで表示する
// コードブロック内や、html(md)特殊記号の途中で切れると表示が変になるので、キリのいいところまでは表示させる
const postIntro = computed(() => {
  const postContents = props.blogInfo.body
  const indexOfToc = postContents.indexOf('[[toc]]')
  if (indexOfToc !== -1) {
    return postContents.substring(0, indexOfToc) + '...'
  }
  const maxLength = 300 //文字数

  return postContents.substring(0, maxLength) + '...'
})

</script>
<template>
    <el-card class="card">
        <div class="date">
          <span>{{ blogInfo.createdAt?.YearMonthDayJP }}</span>
          <span v-if="blogInfo.createdAt?.YearMonthDayJP !== blogInfo.updatedAt?.YearMonthDayJP">(更新日:{{ blogInfo.updatedAt?.YearMonthDayJP }})</span>
        </div>
        <h2>
          <nuxt-link :to="`/blog/${blogInfo.slug}`" class="c-p"> {{ blogInfo.title }} </nuxt-link>
        </h2>
        <nuxt-link :to="`/blog/category/${blogInfo.categorySlug}`" class="c-p">
          <el-tag class="category">
          {{ blogInfo.categoryName }}
          </el-tag>
        </nuxt-link>
        <nuxt-img
        :src="blogInfo.eyecatchUrl"
        :alt="blogInfo.eyecatchAlt"
        quality="70"
        sized="sm:100vw md:50vw lg:400px"
        class="eyecatch-img"
        format="webp"
        />
        <div class="article-body" v-html="$mdRenderer.render(postIntro || '')" />
        <div style="padding: 14px">
            <div class="bottom">
              <nuxt-link :to="`/blog/${blogInfo.slug}`" class="c-p">
                  <el-button text class="button">続きを見る</el-button>
              </nuxt-link>
            </div>
        </div>
    </el-card>
</template>
<style>
.date {
  font-size: 13px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}


.card {
  width: 50%;
  text-align:center;
}

.article-body {
  text-align: left;
}

.category {
  margin-top:20px;
  margin-bottom:20px;
}
</style>