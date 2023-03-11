<script setup lang="ts">
import { useContentfulStore } from '~~/stores/contentful';

const { getBlogPostImage} = useContentfulStore()

const imageUrl = getBlogPostImage
</script>

<template>
    <el-card class="card">
        <el-image :src="imageUrl" />
        <h2>ろっぽん</h2>
        <p>
            システムエンジニアです。主にアプトプットの練習としてこちらのブログで自由気ままに発信しています。
            興味分野は暗号通貨,AI,フロントエンド技術です。趣味はジョギングです。速くなりたい。
            <!-- todo: この文章もcontentfulで管理する -->
        </p>
    </el-card>
</template>
<style scoped>
.card {
    width: 90%;
}
</style>