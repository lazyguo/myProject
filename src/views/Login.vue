<template>
  <div class="home-contain">
    <div class="login">
      <div class="login-title">开始</div>
      <el-form
        ref="ruleFormRef"
        class="demo-ruleForm login-info"
        status-icon
        :model="form"
        label-width="80px"
      >
        <el-form-item label="账号:">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
      <el-button @click="login" class="login-start">登录</el-button>
      <div class="login-other">
        <span class="textSelect">忘记密码</span>
        <span class="textSelect" @click="router.push('/registerUser')">注册账户</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getRouterListApi } from '@/api/router_api'
import { loginStore } from '@/storePinia/index'
export default {
  name: 'AssignModal'
}
</script>
<script lang="ts" setup>
const store = loginStore()
const router = useRouter()
interface formItem {
  username: string
  password: string
}
let ruleFormRef = ref<FormInstance>()
let form = reactive<formItem>({
  username: 'sole',
  password: 'sole123'
})
// 获取列表信息
getRouterListApi().then(res => {
  console.log(res.data,'resss');
})
const login = () => {
  console.log(123);
  
  store.login(form).then(res => {
    if (res.status == 'success') {
      let power = res.power
      if (power == 'admin' || power == 'super') {
        router.push('/core')
      } else {
        router.push({name:'UserCenter'})
      }
      ElMessage.success('欢迎回家')
    } else {
      ElMessage.success('登陆失败')
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.home-contain {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/imgs/cat.jpg') no-repeat;
}
.login {
  position: relative;
  width: 480px;
  height: 280px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: 2px solid #fff;
  .login-title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin-top: 15px;
    user-select: none;
  }
  .login-info {
    margin: 30px auto;
  }
  .login-start {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 200px;
    justify-content: center;
    background-color: #bdb0c2;
    border: 1px solid #fff;
    color: #fff;
  }
  .login-other {
    width: 200px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
    margin: 0 auto;
    color: #deccbe;
    span {
      margin: 0 15px;
      cursor: pointer;
    }
  }
}
::v-deep .el-input .el-input__wrapper {
  flex-grow: 0.9;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  box-shadow: 0 0 0 1px #bdb0c2 inset;
}
::v-deep .el-form-item__label {
  color: #fff;
}
</style>
