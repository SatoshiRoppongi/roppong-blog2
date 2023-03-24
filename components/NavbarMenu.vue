<script setup lang="ts">

import { useContentfulStore } from '~~/stores/contentful';
const { getContentsSummaries } = useContentfulStore()
</script>
<template>
    <NuxtLink to="/blog" tag="div" class="c-p">
        <el-menu-item index="blog">
        <el-icon><HomeFilled /></el-icon>
        ホーム
        </el-menu-item>
    </NuxtLink>
    <NuxtLink v-for="cat in getContentsSummaries('category')" :key="cat.slug" :index="cat.slug" :to="`/blog/category/${cat.slug}`" class="c-p">
        <el-menu-item :index="cat.slug">
            <el-icon v-if="cat.slug">
                <component v-bind:is="$iconComponent(cat.slug)" />
            </el-icon>
            {{ cat.title }}
        </el-menu-item>
    </NuxtLink>
    <div class="flex-grow" />
    <NuxtLink to="/blog/about" tag="div" class="c-p">
        <el-menu-item index="about">
            <el-icon>
                <InfoFilled />
            </el-icon>
            このブログについて
        </el-menu-item>
    </NuxtLink>
    <NuxtLink to="/blog/contact" tag="div" class="c-p">
        <el-menu-item index="contact">
            <el-icon>
                <Promotion />
            </el-icon>
            お問い合わせ
        </el-menu-item>
    </NuxtLink>
</template>
<style scoped>
.flex-grow {
    flex-grow: 1;
}

</style>