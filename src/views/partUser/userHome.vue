<template>
  <div class="user-container">
    <el-container style="height: 100%">
      <!-- 头部区域 -->
      <el-header style="padding: 0">
        <theHeader></theHeader>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" style="background-color: #7eb676">
          <theAside></theAside>
        </el-aside>
        <!-- 主体内容 -->
        <el-main style="background-color: #d1ecc3">
          <div class="main_header">
            <el-breadcrumb :separator-icon="ArrowRight" style="color: #fff">
              <el-breadcrumb-item>哈喽</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="main_body">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="username" label="用户名" />
              <el-table-column prop="nickName" label="昵称" />
              <el-table-column prop="email" label="邮箱" />
              <el-table-column prop="power" label="等级" />
              <el-table-column prop="status" label="状态" />
              <el-table-column>
                <template v-slot="scope">
                  <el-button type="waring">修改</el-button>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import theHeader from '@/components/theHeader.vue'
import theAside from '@/components/theAside.vue'
import { ArrowRight } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 100%;
}
.main_header {
  height: 30px;
  border-bottom: 1px dashed #fff;
}
</style>
