<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h1>roppong blog</h1>
                <navbar />
            </el-header>
            
            <el-container>
                <el-main><slot />
                </el-main>
                <el-aside width="200px">Aside</el-aside>
            </el-container>
        </el-container>
    </div>
</template>