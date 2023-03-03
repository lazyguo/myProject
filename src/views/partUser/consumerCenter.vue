<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="font-size: 18px" class="header">
        <theUserHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <theUserAside />
        </el-aside>
        <el-main>
          <theUserMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import theUserHeader from '@/components/theUserHeader.vue'
import theUserMain from '@/components/theUserMain.vue'
import theUserAside from '@/components/theUserAside.vue'
</script>
<style lang="scss" scoped>
@keyframes gradient {
  0% {
    background-position: 0 12%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0 12%;
  }
}
.common-layout {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  // background: linear-gradient(to right bottom, #392b42, #cfaa74);
  background: linear-gradient(
    -45deg,
    rgb(238, 208, 248),
    rgb(240, 140, 140),
    rgb(132, 208, 183),
    rgb(107, 194, 252),
    rgb(112, 112, 216)
  );
  background-size: 200% 100%;
  animation: gradient 8s ease infinite;
  .header {
    display: flex;
    justify-content: space-between;
  }
}
::v-deep .el-header,
::v-deep .el-aside,
::v-deep .el-card,
::v-deep .el-button {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.25);
}
::v-deep .el-header {
  line-height: 50px;
}
::v-deep .el-main {
  color: #fff;
  height: 100%;
}
::v-deep .el-card {
  height: 180px;
  border: none;
}
::v-deep .el-badge__content {
  top: 18px;
  left: 2px;
}
</style>
