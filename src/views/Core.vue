<template>
  <div class="contain">
    <div class="tabList">
      <div class="tab" @click="router.push({name:'UserCenter'})">
        <div class="tabImg"></div>
        <div class="tabText">管理页面</div>
      </div>
      <div class="tab" @click="router.push({name:'consumerCenter'})">
        <div class="tabImg2"></div>
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
    perspective: 800px;
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
      transition: transform 0.5s;
      &:hover {
        transform: translate3d(0, 0, 400px);
        transform: translateZ(80px);
        .tabImg {
          transform: rotateY(180deg);
        }
        .tabImg2 {
          transform: rotateY(-180deg);
        }
      }
      .tabImg,
      .tabImg2 {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: url('@/assets/imgs/bg.jpg') no-repeat;
        transition: transform 0.5s;
      }
      .tabImg {
        background-position: 31% 12%;
      }
      .tabImg2 {
        background-position: 69% 8%;
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
