<script setup lang="ts">
import { Entry, EntryCollection } from 'contentful';
import { createAdapter } from 'contentful-management/dist/typings/create-adapter';
import { ICategory, ICategoryFields } from '~~/@types/generated/contentful';


type CategoryTitle = {
    title: string,
    slug: string,
}

const activeIndex = ref('1')

const { $contentfulClient } = useNuxtApp()
const categories = await $contentfulClient.getEntries<ICategoryFields>({
    content_type: 'category',
    order: '-sys.createdAt',
})

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
        <el-menu-item index="1">
            <NuxtLink to="/blog">Home</NuxtLink>>
        </el-menu-item>
        <el-menu-item v-for="(cat, i) in categoryTitleList" :key="cat.slug"  :index="i + 1">
            <NuxtLink :to="'/blog/'+cat.slug">
                {{ cat.title }}
            </NuxtLink>
        </el-menu-item>
    </el-menu>
</template>