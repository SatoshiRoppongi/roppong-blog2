<script setup lang="ts">
import { useContentfulStore } from '~~/stores/contentful';

const { getBlogPostImage, store, toRibbit} = useContentfulStore()

const imageUrl = getBlogPostImage

const socialInfoList = [
    {
        'imgSrc': 'github.png',
        'linkTo': 'https://github.com/SatoshiRoppongi'
    },
    {
        'imgSrc': 'strava.png',
        'linkTo': 'https://www.strava.com/athletes/43984091'
    },
    {
        'imgSrc': 'twitter.png',
        'linkTo': 'https://twitter.com/roppong3'
    },
    {
        'imgSrc': 'youtube.png',
        'linkTo': 'https://www.youtube.com/user/s6hori'
    }
]
</script>

<template>
    <el-card class="card">
        <nuxt-img
            alt="my profile picture"
            :src="imageUrl[store.isRibbit? 0 : 1]"
            quality="70"
            sized="sm:100vw md:50vw lg:400px"
            class="eyecatch-img"
            format="webp"
            />
        <h2>{{ store.isRibbit ? 'ribbit face' : 'ろっぽん' }}</h2>
        <p class="profiletext">
            {{ 
            store.isRibbit ? 
            `GM! Ribit ribbit, ribbit! ribbbbbiiiiit, LFG, ribit riiiiiiiiibit rrrrrrrribit
            ribbit ribbit just ribbit ririririririririririririrbbbbbbbiiiiiiiiiiiitttt!!!!
            `
            :
            `システムエンジニアです。主にアプトプットの練習としてこちらのブログで自由気ままに発信しています。
            興味分野は暗号通貨,AI,フロントエンド技術です。趣味はジョギングです。速くなりたい。`
            
            }}
            <!-- todo: この文章もcontentfulで管理する -->
        </p>
        <el-row :gutter="30">
            <el-col v-for="(info, i) in socialInfoList" :span="6" :key="i">
                <a :href="info.linkTo">
                    <nuxt-img
                        :src="`/${info.imgSrc}`"
                        quality="70"
                        sized="sm:100vw md:50vw lg:400px"
                        alt="profile image(me)"
                        class="eyecatch-img"
                        format="webp"
                        />
                </a>
            </el-col>
        </el-row>
        <el-button disabled class="button" type="info">
            {{ store.isRibbit ? 'ribbit dibbit(pribitting)' : '詳細はこちら(準備中)' }}
        </el-button>
    </el-card>
</template>
<style scoped>
.card {
    width: 90%;
    text-align: center;
}
.profiletext {
    text-align: left;
}

.button {
    margin-top: 20px;
    padding: 20px;
}
</style>