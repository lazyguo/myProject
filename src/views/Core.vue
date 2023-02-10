<template>
  <div class="contain">
    <div class="tabList">
      <div class="tab" @click="router.push('/userHome')">
        <div class="tabImg"></div>
        <div class="tabText">管理页面</div>
      </div>
      <div class="tab">
        <div class="tabImg"></div>
        <div class="tabText">普通页面</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100%;
  background: url('@/assets/imgs/bg.jpg') no-repeat;
  .tabList {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .tab {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 40px;
      width: 400px;
      height: 230px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 15px;
        cursor: pointer;
      .tabImg {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: url('@/assets/imgs/bg.png') no-repeat;
      }
      .tabText {
        color: #cfb3c9;
        font-size: 26px;
        margin-top: 20px;
        user-select: none;
      }
    }
  }
}
</style>
