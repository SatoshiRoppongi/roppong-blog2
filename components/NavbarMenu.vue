<script setup lang="ts">


import { useContentfulStore } from '~~/stores/contentful';
const { getContentsSummaries, store, toRibbit} = useContentfulStore()
</script>
<template>
    <NuxtLink to="/blog" tag="div" class="c-p">
        <el-menu-item index="blog">
        <el-icon><HomeFilled /></el-icon>
        {{ store.isRibbit ? 'my swamp' : 'ホーム' }}
        </el-menu-item>
    </NuxtLink>
    <NuxtLink v-for="cat in getContentsSummaries('category')" :key="cat.slug" :index="cat.slug" :to="`/blog/category/${cat.slug}`" class="c-p">
        <el-menu-item :index="cat.slug">
            <el-icon v-if="cat.slug">
                <component v-bind:is="$iconComponent(cat.slug)" />
            </el-icon>
                {{ store.isRibbit ? toRibbit(cat.title || '') : cat.title }}
            <!--
            {{ isRibbit ? toRibbit(cat.title || '') : cat.title }}
            {{ !isRibit }}
        -->
        </el-menu-item>
    </NuxtLink>
    <div class="flex-grow" />
    <NuxtLink to="/blog/about" tag="div" class="c-p">
        <el-menu-item index="about">
            <el-icon>
                <InfoFilled />
            </el-icon>
            {{ store.isRibbit ? 'ribbiout rib bitt' : 'このブログについて' }}
        </el-menu-item>
    </NuxtLink>
    <NuxtLink to="/blog/contact" tag="div" class="c-p">
        <el-menu-item index="contact">
            <el-icon>
                <Promotion />
            </el-icon>
            {{ store.isRibbit ? 'rinbiit' : 'お問い合わせ' }}
        </el-menu-item>
    </NuxtLink>
</template>
<style scoped>
.flex-grow {
    flex-grow: 1;
}

</style>