<template>
    <section class="main">
        <div class="video-box overray">
            <video class="video" src="/landing.mp4" poster="/landing_page_img.png" autoplay loop muted />
        </div>
        <div class="text-box">
            <h1>こんにちは<br>roppong.com</h1>
            <div class="button">
                <NuxtLink to="blog" class="c-p">
                    <el-button>
                        ブログへ
                    </el-button>
                </NuxtLink>
            </div>

        </div>
    </section>
</template>
<script setup>
definePageMeta({
    layout: "empty",
})
</script>
<style scoped>
 /* wrap */

 .main {
   position: relative;
 }
 
 /* video */
 
 .video-box {
   position: relative;
   overflow: hidden;
   width: 100%;
   height: 100vh;
 }
 .video {
   position: absolute;
   top: 50%;
   left: 50%;
   min-width: 100%;
   min-height: 100%;
   -webkit-transform: translate(-50%, -50%);
   -moz-transform: translate(-50%, -50%);
   transform: translate(-50%, -50%);
 }
 
 /* overlay */
 
 .overlay::after {
   position: absolute;
   top: 0;
   left: 0;
   display: block;
   width: 100%;
   height: 100%;
   content: "";
   background: rgba(0, 0, 0, 0.4);
 }
 
 /* text */
 
 .text-box {
   position: absolute;
   top: 50%;
   left: 50%;
   width: 100%;
   -webkit-transform: translate(-50%, -50%);
   -moz-transform: translate(-50%, -50%);
   transform: translate(-50%, -50%);
 }
 h1 {
   font-family: Roboto;
   font-size: 40px;
   font-weight: bold;
   line-height: 1.2;
   padding: 0 50px;
   text-align: center;
   color: #fff;
 }
 .button {
    text-align: center;
 }
 

</style>