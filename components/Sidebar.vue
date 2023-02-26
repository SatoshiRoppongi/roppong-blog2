<script setup lang="ts">
type GroupType = 'recent' | 'category' | 'archive'
interface GroupInfo {
    groupType: GroupType;
    groupName: string;
    length?: number; // 表示件数
}

const groupInfo: GroupInfo[] = reactive([
    {
        groupType: 'recent',
        groupName: '最近の投稿',
        length: 5

    },
    {
        groupType: 'category',
        groupName: 'カテゴリ',
    },
    {
        groupType: 'archive',
        groupName: 'アーカイブ'
    },
]);

</script>
<template>
    <ProfileCard />
    <div v-for="(group, index) in groupInfo" :key="index">
        <MenuCard :groupType="group.groupType" :groupName="group.groupName" :length="group.length"/>
    </div>
</template>