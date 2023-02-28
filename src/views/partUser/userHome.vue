<template>
  <div class="user-container">
    <el-container style="height: 100%">
      <!-- 头部区域 -->
      <el-header style="padding: 0">
        <theHeader></theHeader>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" class="user_aside">
          <theAside></theAside>
        </el-aside>
        <!-- 主体内容 -->
        <el-main class="user_main">
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
import { Menu } from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
.user-container {
  width: 100%;
  height: 100%;
}
.user_aside {
  @include theme_aside($aside-background-primary1);
}
.user_main {
  @include theme_main($main-background-primary1);
}
</style>
