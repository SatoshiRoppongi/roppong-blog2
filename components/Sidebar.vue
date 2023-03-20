<script setup lang="ts">
import { CONTENT_TYPE } from "~~/@types/generated/contentful";

export type GroupType = 'recent' | 'category' | 'archive'
interface GroupInfo {
    groupType: GroupType;
    groupName: string;
    contentType: "blogPost" | "category"
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
    <ProfileCard class="profilecard" />
    <MenuCard class="menucard" v-for="(group, index) in groupInfo" :key="index" :groupType="group.groupType" :groupName="group.groupName" :contentType="group.contentType" :length="group.length"/>
    <template>
          <adsbygoogle ad-slot="7309254084" />
    </template>
</template>
<style scoped>
.profilecard {
    margin-top: 30px;
    margin-bottom: 30px;
}

.menucard {
    margin-top: 30px;
    margin-bottom: 30px;
}

</style>