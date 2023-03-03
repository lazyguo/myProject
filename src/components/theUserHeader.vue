<template>
  <div class="backButton">
    <el-button round @click="turnBack">
      <el-icon size="25px"><Back /></el-icon>
    </el-button>
  </div>
  <div class="box" style="margin-left: 65px;width: 128px;position: relative;">
    <h3>奇奇怪怪网站</h3>
  </div>
  <div class="avatar">
    <el-badge :value="12">
      <el-icon size="35px" class="item"><ChatDotSquare /></el-icon>
    </el-badge>
    <el-icon size="35px" class="item"><Setting /></el-icon>
    <el-avatar :size="50" :src="fileImg == '' ? demoImg : fileImg" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { loginStore } from '@/storePinia/index'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = loginStore()
const fileImg = ref('')
const demoImg = require('@/assets/imgs/ava.png')
// 监听pinia存储数据修改
watch(
  () => store.userInfo,
  newVal => {
    fileImg.value = newVal
  },
  {
    deep: true,
    immediate: true
  }
)
const turnBack = () => {
  router.push('/core')
}
// 判断该账户是否有头像，如有则使用，无则用默认
fileImg.value = store.userInfo.imgUrl
</script>
<style lang="scss" scoped>
h3 {
  padding: 0;
  margin: 0;
  cursor: pointer;
}
h3::before {
  content: '';
  height: 2px;
  background: #cba773;
  display: inline-block;
  position: absolute;
  top: 46px;
  width: 0;
  transition: width 0.56s;
}
h3:hover::before {
  width: 100%;
}
.avatar {
  width: 10%;
  display: flex;
  justify-content: space-between;
  .item {
    padding-top: 12px;
    cursor: pointer;
  }
}
</style>
