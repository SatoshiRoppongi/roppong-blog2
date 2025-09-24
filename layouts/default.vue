<template>
    <el-container>
        <el-header height="150px">
            <h1>roppong blog</h1>
            <Navbar />
        </el-header>
        <el-container class="main">
            <el-container class="contents">
                <el-main>
                    <slot />
                </el-main>
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