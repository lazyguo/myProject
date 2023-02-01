<template>
  <div class="header_container">
    <div class="header_title">你种的花，人间都开遍了</div>
    <div class="header_tool">
      <el-dropdown>
        <div class="avatar">
          <el-avatar :size="50" :src="fileImg" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed } from 'vue'
import fileImg from '@/assets/imgs/ava.png'
</script>
<script lang="ts" setup>
let avatarUrl: string = ref()
</script>

<style lang="scss" scoped>
.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #9fdaa4;
  .header_title {
    margin-left: 20px;
    font-size: 20;
    color: #fff;
  }
}
.header_tool {
  display: flex;
  align-items: center;
  width: 60px;
  height: 80px;
}
</style>
