<script setup lang="ts">
import { BlogPost } from '~~/stores/contentful';
const props = defineProps <{
  blogInfo: BlogPost
}>()
</script>
<template>
    <el-card :body-style="{padding: '0px' }">
        <div class="date">
          <span>作成日:{{ blogInfo.createdAt?.YearMonthDayJP }}</span>
          <span>(更新日:{{ blogInfo.updatedAt?.YearMonthDayJP }})</span>
        </div>
        <div class="title">{{ blogInfo.title }}</div>
        <div class="catgory"> {{ blogInfo.categoryName }}</div>
        <img
        :src="`https:${blogInfo.eyecatchUrl || '//picsum.photos/900/300/?random='+Math.random()}`"
        class="image"
        />
        {{ blogInfo.body }}
        <div style="padding: 14px">
            <span>Yummy hamburger</span>
            <div class="bottom">
                <el-button text class="button">Operating</el-button>
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