<script setup lang="ts">
import { useContentfulStore } from '~~/stores/contentful';

const { getBlogPostImage} = useContentfulStore()

const imageUrl = getBlogPostImage
</script>

<template>
    <el-card>
        <el-image :src="imageUrl" />
        profile
    </el-card>
</template>