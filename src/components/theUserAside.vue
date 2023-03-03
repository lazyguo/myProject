<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="rgba(0, 0, 0, 0)"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
    >
    <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
::v-deep .el-menu{
  border:none;
}
</style>
