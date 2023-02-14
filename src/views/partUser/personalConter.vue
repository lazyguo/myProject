<template>
  <div class="personal-conter">
    <div class="personal-header">
      <div class="trunBack">返 回</div>
    </div>
    <div class="personal-body">
      <el-card class="box-card">
        <el-avatar :size="165" :src="fileImg == '' ? demoImg : fileImg" />
        <div class="card-content">{{ store.userInfo.nickname }}</div>
      </el-card>
      <el-card class="box-BottomCard">
        <template #header>
          <div class="card-header">
            <span>个人资料</span>
          </div>
          <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
        </template>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { loginStore } from '@/storePinia/index'

const fileImg = ref('')
const store = loginStore()
const demoImg = require('@/assets/imgs/ava.png')

// 判断该账户是否有头像，如有则使用，无则用默认
fileImg.value = store.userInfo.imgUrl
</script>
<style lang="scss" scoped>
.personal-header {
  position: relative;
  height: 55px;
  background-color: rgb(226, 180, 206);
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.2);
  .trunBack {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 70px;
    height: 30px;
    border-radius: 20px;
    text-align: center;
    line-height: 28px;
    color: #fff;
    cursor: pointer;
    border: 2px solid #fff;
  }
}
.personal-body {
  width: 75%;
  height: 800px;
  background-color: pink;
  margin: 30px auto;
  .box-card {
    text-align: center;
    width: 25%;
    .card-content {
      padding-top: 12px;
      font-size: 22px;
    }
  }
  .box-BottomCard {
    width: 25%;
    margin-top: 20px;
    .card-header {
      text-align: center;
      font-size: 22px;
    }
  }
}
::v-deep .el-card__header {
  padding: 10px 0;
}
</style>
