<template>
    <el-container>
        <el-header height="150px">
            <h1>{{store.isRibbit ? 'ribbit blog' : 'roppong blog'}}</h1>
            <Navbar />
        </el-header>
        <el-container class="main">
            <el-container class="contents">
                <el-main>
                    <slot />
                </el-main>
                  <el-switch
                    v-model="store.isRibbit"
                    class="ml-2 switch"
                    inline-prompt
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    active-text="日本語翻訳に切り替える"
                    inactive-text="ribbit ribbit"
                    size="large"
                />

                <el-backtop :right="100" :bottom="100" />
            </el-container>
            <el-aside class="aside" width="350px"> 
                <Sidebar />
            </el-aside>
        </el-container>
        <el-footer class="footer" height="150px">
            <p class="copyright">
            (c) 2023 Satoshi Roppongi
            </p>

        </el-footer>
    </el-container>
</template>
<script setup lang="ts">

import { useContentfulStore } from "~~/stores/contentful"
const { store } = useContentfulStore();
console.log('teeeee')
// const isRibbit = ref(true)
// const isRibbit = ref(true)
</script>
<style scoped>
.main {
    margin-left: 200px;
    margin-right: 200px;
}
/*
* {
	outline: 1px solid magenta;
}
*/
.footer {
    position: relative;
    margin-top: 50px;
    background-color:aliceblue;

}

.copyright {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.switch {
    position: fixed;
    left: 0;
    margin-left: 20px;
}

@media screen and (max-width: 1200px) {
    .main {
        display: block;
        margin-left: 10px;
        margin-right: 10px;
    }
    .main .contents {
        width: 100%;
        margin:  0 auto;
    }
    .main .aside {
        width: 100%;
        margin: 0 auto;
    }
}
</style>