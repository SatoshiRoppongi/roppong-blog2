<script setup lang="ts">
import { useContentfulStore } from "~~/stores/contentful"

const props = defineProps<{
    groupType: string
    groupName: string
    length?: number
}>()

const { getSummeryInfo } = useContentfulStore()

</script>
<template>
    <el-card classs="box-card">
        <template #header>
            <div class="card-header">
                <span> {{ groupName }}</span>
            </div>
        </template>
        <div v-for="(info, index) in getSummeryInfo(groupType, length)" :key="index">
            <NuxtLink :to="`/blog/${info.slug}`">
            {{ info.title }}
            </NuxtLink>
        </div>
    </el-card>
</template>
<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}
</style>