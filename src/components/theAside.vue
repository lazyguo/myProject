<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo asideMenu"
    text-color="#fff"
    active-text-color="#6f6994"
  >
    <el-menu-item index="1" @click="router.push({name:'UserCenter'})">
      <el-icon><UserFilled /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="2" @click="router.push({name:'RouterCenter'})">
      <el-icon><Promotion /></el-icon>
      <span>路由管理</span>
    </el-menu-item>
    <el-menu-item index="3" @click="router.push({name: 'bigVisu'})">
      <el-icon><Platform /></el-icon>
      <span>可视化大屏</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { UserFilled,Promotion,Platform } from '@element-plus/icons-vue'
const router = useRouter()
const jump = path => {
  console.log('path', path)
  router.push(`/${path}`)
}
const handleClose = () => {
  console.log('5555')
}
const handleOpen = () => {
  console.log('5666')
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";
.asideMenu {
  @include theme_aside_menu($aside-menu-primary1);
  border: none;
}
::v-deep .el-menu-item:hover {
  background: rgba($color: #000000, $alpha: .1) !important;
}
</style>
