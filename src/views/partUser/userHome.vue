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
        <el-main style="background-color: #d1ecc3" class="userMain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// 引入公共组件
import theHeader from '@/components/theHeader.vue'
import theAside from '@/components/theAside.vue'

</script>
<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 100%;
}
</style>
