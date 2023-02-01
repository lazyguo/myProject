<template>
  <div class="user-container">
    <el-container style="height:100%">
      <el-header style="padding:0">
        <theHeader></theHeader>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #7eb676;">
          <theAside></theAside>
        </el-aside>
        <el-main  style="background-color: #d1ecc3;">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import theHeader from '@/components/theHeader.vue'
import theAside from '@/components/theAside.vue'
</script>

<style lang="scss" scoped>
.user-container {
  width: 100%;
  height: 100%;
}
</style>
