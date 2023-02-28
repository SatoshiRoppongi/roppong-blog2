<script setup lang="ts">
import { CONTENT_TYPE } from "~~/@types/generated/contentful"
import { useContentfulStore } from "~~/stores/contentful"
import { GroupType } from "./Sidebar.vue"

const props = defineProps<{
    groupType: GroupType
    groupName: string
    contentType: CONTENT_TYPE
    length?: number
}>()

const slugBase = computed(() => {
    return props.groupType === 'recent' ? "/blog/" : `/blog/${props.groupType}/`

})

const { getContentsSummaries, groupByYearMonth} = useContentfulStore()

const useFunction = props.groupType === 'archive' ? groupByYearMonth:  getContentsSummaries

</script>
<template>
    <el-card classs="box-card">
        <template #header>
            <div class="card-header">
                <span> {{ groupName }}</span>
            </div>
        </template>
        <div v-for="(info, index) in useFunction(contentType, length)" :key="index">
            <NuxtLink :to="`${slugBase}${info.slug}`">
            {{ info.title }} {{ info.count }}
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