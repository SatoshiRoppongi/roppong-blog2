<script setup lang="ts">
import { Entry, EntryCollection } from 'contentful';
import { createAdapter } from 'contentful-management/dist/typings/create-adapter';
import { ICategory, ICategoryFields } from '~~/@types/generated/contentful';


const { $contentfulClient } = useNuxtApp()
const categories = await $contentfulClient.getEntries<ICategoryFields>({
    content_type: 'category',
    order: '-sys.createdAt',
})
const categoryTitleList = categories.items.map((cat) => cat.fields.title)


</script>
<template>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink v-for="cat in categoryTitleList" :key="cat.length">
            {{ cat }}
        </NuxtLink>
    </nav>
</template>