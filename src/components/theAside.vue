<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#7eb676"
    text-color="#fff"
    active-text-color="#ccc1be"
  >
    <el-menu-item index="1" @click="jump('userHome')">
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="2" @click="jump('core')">
      <span>未知</span>
    </el-menu-item>
    <el-menu-item index="3" @click="router.push({name: 'bigVisu'})">
      <span>可视化大屏</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
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

<style></style>
