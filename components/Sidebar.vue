<script setup lang="ts">
import { CONTENT_TYPE } from "~~/@types/generated/contentful";

export type GroupType = 'recent' | 'category' | 'archive'
interface GroupInfo {
    groupType: GroupType;
    groupName: string;
    contentType: CONTENT_TYPE
    length?: number; // 表示件数
}

const groupInfo: GroupInfo[] = reactive([
    {
        groupType: 'recent',
        groupName: '最近の投稿',
        contentType: 'blogPost',
        length: 5

    },
    {
        groupType: 'category',
        groupName: 'カテゴリ',
        contentType: 'category'
    },
    {
        groupType: 'archive',
        groupName: 'アーカイブ',
        contentType: 'blogPost'
    },
]);

</script>
<template>
    <ProfileCard />
    <el-space direction="vertical" :size="25" alignment="center">
        <div v-for="(group, index) in groupInfo" :key="index">
            <MenuCard :groupType="group.groupType" :groupName="group.groupName" :contentType="group.contentType" :length="group.length"/>
        </div>
    </el-space>
</template>