<script setup lang="ts">
import { useContentfulStore } from '~~/stores/contentful';

const nuxtApp = useNuxtApp()

const pcWindowSize = 1318

const windowSize = ref(0)
const isPc = ref(true)

const { getContentsSummaries } = useContentfulStore()

const route = useRoute()

const activeIndex = route.path.split('/')[3] || 'blog'
console.log('testtest')
console.log(activeIndex)

// todo: 順番を並び替える

const handleSelect = (key: string, keyPath: string[]) => {}

const resizeWindow = () => {windowSize.value = window.innerWidth}

onMounted(() => {
    windowSize.value = window.innerWidth
    window.addEventListener('resize', resizeWindow)
    isPc.value = windowSize.value > pcWindowSize ? true : false
})

watchEffect(() => {
    isPc.value = windowSize.value > pcWindowSize ? true : false
})


</script>
<template>
    <client-only>
        <el-menu
            :default-active="activeIndex"
            class="el-menu"
            mode="horizontal"
            @select="handleSelect"
            :ellipsis=false
        >
            <NavbarMenu v-if="isPc" />
            <el-sub-menu v-else index="1">
                <template #title>
                <el-icon><Expand /></el-icon>
                <span>メニュー</span>
                </template>
                <NavbarMenu />
            </el-sub-menu>
        </el-menu>
    </client-only>
</template>
<style scoped>
</style>