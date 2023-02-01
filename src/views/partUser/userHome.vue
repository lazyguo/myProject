<template>
  <div class="user-container">
    <el-container style="height:100%">
      <el-header >Header</el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #fff;">Aside</el-aside>
        <el-main  style="background-color: #000;">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 100%;
  background-color: orange;
}
</style>
