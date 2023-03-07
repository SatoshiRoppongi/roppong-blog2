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
    <el-card :body-style="{padding: '0px' }">
        <div class="date">
          <span>作成日:{{ blogInfo.createdAt?.YearMonthDayJP }}</span>
          <span>(更新日:{{ blogInfo.updatedAt?.YearMonthDayJP }})</span>
        </div>
        <nuxt-link :to="`/blog/${blogInfo.slug}`"> {{ blogInfo.title }} </nuxt-link>
        <div class="catgory"> {{ blogInfo.categoryName }}</div>
        <img
        :src="blogInfo.eyecatchUrl"
        class="image"
        />
        <div v-html="$mdRenderer.render(postIntro || '')" />
        <div style="padding: 14px">
            <div class="bottom">
                <el-button text class="button">続きを見る</el-button>
            </div>
        </div>
    </el-card>
</template>
<style>
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

.image {
  width: 100%;
  display: block;
}
</style>