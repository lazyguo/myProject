<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="font-size: 18px"> 奇奇怪怪网站 </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>
<style lang="scss" scoped>
.common-layout {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right bottom, #392b42, #cfaa74);
  .card ,.card-body{
    width: 90%;
    margin: 20px 0 0 75px;
  }
  .card-body {
    ::v-deep .el-card{
      height: 550px;
    }
  }
}
::v-deep .el-header,
::v-deep .el-aside,
::v-deep .el-card {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.25);
}
::v-deep .el-header {
  line-height: 55px;
}
::v-deep .el-main {
  color: #fff;
  height: 100%;
}
::v-deep .el-card {
  height: 180px;
  border: none;
}
</style>
