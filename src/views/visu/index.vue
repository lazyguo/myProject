<template>
  <div class="su_container">
    <div class="su_header">
      <suHeader></suHeader>
    </div>
    <div class="su_main">
      <RightTop class="rightTop"></RightTop>
      <rightBottom class="rightBottom"></rightBottom>
      <leftTop class="leftTop"></leftTop>
      <leftBottom class="leftBottom"></leftBottom>
      <suCenter class="suCenter"></suCenter>
    </div>
  </div>
</template>

<script setup lang="ts">
import suHeader from './components/suHeader.vue'
import leftTop from './components/suLeftTop.vue'
import leftBottom from './components/suLeftBottom.vue'
import rightBottom from './components/suRightBottom.vue'
import RightTop from './components/suRightTop.vue'
import suCenter from './components/suCenter.vue'
</script>

<style lang="scss" scoped>
  .su_container {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #282c34;
  }
  .su_header {
    width: 100%;
    height: 9%;
  }
  .su_main {
    position: relative;
    height: 91%;
    .leftTop {
      position: absolute;
      left: 0;
    }
    .leftBottom {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .rightTop {
      position: absolute;
      right: 0;
    }
    .rightBottom {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .suCenter {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>