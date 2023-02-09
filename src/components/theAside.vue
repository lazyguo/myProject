<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#7eb676"
    text-color="#fff"
    active-text-color="#ccc1be"
  >
    <el-menu-item index="1">
      <el-icon><UserFilled /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>未知</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><icon-menu /></el-icon>
      <span>未知</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
const handleClose = ()=>{
  console.log('5555');
}
const handleOpen = ()=>{
  console.log('5666');
}
</script>

<style></style>
