<script setup lang="ts">
import { Entry, EntryCollection } from 'contentful';
import { createAdapter } from 'contentful-management/dist/typings/create-adapter';
import { CONTENT_TYPE, ICategory, ICategoryFields } from '~~/@types/generated/contentful';
import { useContentfulStore } from '~~/stores/contentful';



const { getContentsSummaries } = useContentfulStore()

const route = useRoute()

const activeIndex = route.path.split('/')[3] || 'blog'

// todo: 順番を並び替える

const handleSelect = (key: string, keyPath: string[]) => {}

</script>
<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
    >
    <!-- fixme: メニューの端っこをクリックしても遷移しない -->
        <el-menu-item index="blog">
            <NuxtLink to="/blog" tag="div" class="c-p">Home</NuxtLink>
        </el-menu-item>
        <el-menu-item v-for="cat in getContentsSummaries('category')" :key="cat.slug" :index="cat.slug">
            <NuxtLink :to="`/blog/category/${cat.slug}`" class="c-p">
                {{ cat.title }}
            </NuxtLink>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="about">
            <NuxtLink to="/blog/about" tag="div" class="c-p">このブログについて</NuxtLink>
        </el-menu-item>
        <el-menu-item index="contact">
            <NuxtLink to="/blog/contact" tag="div" class="c-p">お問い合わせ</NuxtLink>
        </el-menu-item>
    </el-menu>
</template>
<style scoped>
.flex-grow {
    flex-grow: 1;
}

/*
.c-p {
    text-decoration: none;
}
*/

</style>