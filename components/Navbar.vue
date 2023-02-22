<script setup lang="ts">
import { Entry, EntryCollection } from 'contentful';
import { createAdapter } from 'contentful-management/dist/typings/create-adapter';
import { ICategory, ICategoryFields } from '~~/@types/generated/contentful';


type CategoryTitle = {
    title: string,
    slug: string,
}


const { $contentfulClient } = useNuxtApp()
const categories = await $contentfulClient.getEntries<ICategoryFields>({
    content_type: 'category',
    order: '-sys.createdAt',
})

const route = useRoute()

console.log('routeroute')
console.log(route.path)

const activeIndex = route.path.split('/')[2] || 'blog'

// todo: 順番を並び替える
const categoryTitleList: CategoryTitle[] = categories.items.map((cat) => { return { title: cat.fields.title, slug: cat.fields.slug } })

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
        <el-menu-item v-for="cat in categoryTitleList" :key="cat.slug" :index="cat.slug">
            <NuxtLink :to="'/blog/'+cat.slug" class="c-p">
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

.c-p {
    text-decoration: none;
}

</style>