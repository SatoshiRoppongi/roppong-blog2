<template>
    <el-container>
        <div>
            <el-header height="150px">
                <h1>roppong blog</h1>
                <Navbar />
            </el-header>
        </div>
        <div>
        <el-container class="main">
            <div>
                <el-container class="contents">
                    <div>
                    <el-main>
                        <slot />
                    </el-main>
                    </div>
                    <el-backtop :right="100" :bottom="100" />
                </el-container>
            </div>
            <div>
                <el-aside class="aside" width="350px"> 
                    <Sidebar />
                </el-aside>
            </div>
        </el-container>
        <div>
            <el-footer class="footer" height="150px">
                <p class="copyright">
                (c) 2023 Satoshi Roppongi
                </p>

            </el-footer>
        </div>
        </div>
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