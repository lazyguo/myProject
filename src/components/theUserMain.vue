<template>
  <div class="card">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card shadow="hover"> Always </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover"> Hover </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover"> Never </el-card>
      </el-col>
    </el-row>
  </div>
  <div class="card-body">
    <el-row :gutter="24">
      <el-col :span="8">
        <el-card shadow="hover"> Always </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover"> Always </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.card,
.card-body {
  width: 90%;
  margin: 20px 0 0 75px;
}
.card-body {
  ::v-deep .el-card {
    height: 550px;
  }
}
</style>
