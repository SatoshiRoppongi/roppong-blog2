<script setup lang="ts">
import { CONTENT_TYPE } from "~~/@types/generated/contentful"
import { useContentfulStore } from "~~/stores/contentful"
import { GroupType } from "./Sidebar.vue"

const props = defineProps<{
    groupType: GroupType
    groupName: string
    contentType: "blogPost" | "category"
    length?: number
}>()

const slugBase = computed(() => {
    return props.groupType === 'recent' ? "/blog/" : `/blog/${props.groupType}/`

})

const { getContentsSummaries, groupByYearMonth} = useContentfulStore()

const useFunction = props.groupType === 'archive' ? groupByYearMonth:  getContentsSummaries

</script>
<template>
    <el-card class="box-card" body-style="{witdh: 480px}">
        <template #header>
            <div class="card-header">
                <span> {{ groupName }}</span>
            </div>
        </template>
        <div v-for="(info, index) in useFunction(contentType, length)" :key="index">
            <NuxtLink :to="`${slugBase}${info.slug}`">
            {{ info.title }} 
            <el-tag v-if="info.count"> {{ info.count }} </el-tag>
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
    width: 90%;
}
</style>