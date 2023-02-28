<template>
  <div class="header_container">
    <div class="header_title">你种的花，人间都开遍了！</div>
    <div class="header_tool">
      <el-dropdown>
        <div class="avatar">
          <el-avatar :size="50" :src="fileImg == '' ? demoImg : fileImg" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="personal">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import { loginStore } from '@/storePinia/index'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
</script>
<script lang="ts" setup>
const store = loginStore()
const fileImg = ref('')
const demoImg = require('@/assets/imgs/ava.png')
const router = useRouter()
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
// 判断该账户是否有头像，如有则使用，无则用默认
fileImg.value = store.userInfo.imgUrl

const personal = () => {
  router.push('/personalConter')
}

const logout = () => {
  store.logout().then(res => {
    if (res == 'success') {
      router.push('/login')
      ElMessage.success('登出成功')
    }
  })
}
</script>

<style lang="scss" scoped>
.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #363a57;
  .header_title {
    margin-left: 20px;
    font-size: 20;
    color: #fff;
  }
}
.header_tool {
  display: flex;
  align-items: center;
  width: 60px;
  height: 80px;
}
.menu_user {
  height: 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
::v-deep .el-dropdown-menu {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
