<template>
  <div class="consumer">
    <div class="consumer-bg">
      <img src="@/assets/imgs/flower.png" />
    </div>
    <!-- <div class="consumer-card">
      <el-card> 1</el-card>
      <el-card> 2</el-card>
      <el-card> 3</el-card>
    </div> -->
  </div>
</template>
<script lang="ts" setup>

// let script = document.createElement('script')
// script.src = '../../assets/js/yinghua.js'
// document.body.appendChild(script)
// import 'https://files.cnblogs.com/files/quaint/sakuraPlus.js'
</script>
<style lang="scss" scoped>
.consumer {
  width: 100%;
  height: 100%;
  background-color: #f5f3f0;
  .consumer-bg {
    margin: 0 auto;
    width: 75%;
    height: 50%;
    opacity: 0.8;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .consumer-card {
    margin: 20px auto;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
