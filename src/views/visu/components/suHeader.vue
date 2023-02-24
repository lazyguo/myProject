<template>
  <div class="su_header">
    <dv-decoration-8 class="h_left" />
    <dv-decoration-7 class="h_title">可视化大平台</dv-decoration-7>
    <dv-decoration-2 class="h_line" :dur="4"/>
    <dv-decoration-8 :reverse="true" class="h_right" />
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.su_header {
  position: relative;
  .h_left {
    position: absolute;
    left: 0;
    top: 20px;
    width: 300px;
    height: 50px;
  }
  .h_title {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    width: 500px;
    height: 30px;
    color: #78dfff;
    font-size: 26px;
  }
  .h_line {
    position: absolute;
    left: 50%;
    top: 55px;
    transform: translateX(-50%);
    width: 50%;
    height: 5px;
  }
  .h_right {
    position: absolute;
    right: 0;
    top: 20px;
    width: 300px;
    height: 50px;
  }
}
</style>
