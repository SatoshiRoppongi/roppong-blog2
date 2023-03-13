<template>
    <div class="common-layout">
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
                    <el-footer>footer</el-footer>
                </el-container>
                <el-aside width="350px"> 
                    <Sidebar />
                </el-aside>
            </el-container>
        </el-container>
    </div>
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
</style>