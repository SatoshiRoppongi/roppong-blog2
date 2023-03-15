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
            <el-divider v-if="index !== 0"/>
            <NuxtLink :to="`${slugBase}${info.slug}`" class="c-p">
                <el-icon v-if="contentType === 'category' && info.slug">
                    <component v-bind:is="$iconComponent(info.slug)" />
                </el-icon>
                    {{ info.title }} 
            <span class="flex-grow" />
            <el-tag v-if="info.count" class="tag"> {{ info.count }} </el-tag>
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

.tag {
    float: right;
    margin-right: 30px;
}
</style>