<template>
    <div class="common-layout">
        <el-container>
            <el-header height="150px">
                <h1>roppong blog</h1>
                <Navbar />
            </el-header>
            <el-container>
                <el-container>
                    <el-main>
                        <slot />
                    </el-main>
                    <el-footer>footer</el-footer>
                </el-container>
                <el-aside width="200px"> 
                    <Sidebar />
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>