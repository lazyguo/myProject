<template>
  <div class="home-contain">
    <div class="login">
      <div class="logo"><img :src="loginLogo"></div>
      <div class="login-title">登录GJ Home</div>
        <input type="text" class="login_input" placeholder="请输入用户名" v-model="form.username">
        <input type="password" class="login_input" placeholder="请输入密码" v-model="form.password">
      <el-button @click="login" class="login-start">登录</el-button>
      <div class="login-other">
        <span class="textSelect" @click="router.push('/registerUser')"><span style="color:#000;font-size:12px">还没账号?</span>立即注册</span>
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
const loginLogo = require('@/assets/imgs/tx.jpg')
interface formItem {
  username: string
  password: string
}
let form = reactive<formItem>({
  username: 'sole',
  password: 'sole123'
})
// 获取列表信息
getRouterListApi().then(res => {
  console.log(res.data,'resss');
})
const login = () => {
  store.login(form).then(res => {
    if (res.status == 'success') {
      let power = res.power
      if (power == 'admin' || power == 'super') {
        router.replace('/core')
      } else {
        router.replace({name:'UserCenter'})
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
  background: url('@/assets/imgs/bg2.jpg') no-repeat;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 480px;
  .logo {
    margin-bottom: 20px;
    img {
      width: 100px;
      height: 100px;
      border: 8px solid #fffef6;
      border-radius: 50%;
    }
  }
  .login-title {
    font-size: 22px;
    color: #fff;
    margin: 15px 0;
    user-select: none;
  }
  .login_input {
    width: 380px;
    height: 45px;
    background-color: rgba(0,0,0,.3);
    color: #fff;
    border-radius: 20px;
    border: none;
    outline: none;
    padding-left: 20px;
    margin-top: 20px
  }
  .login-start {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: rgba(0,0,0,.3);
    border: 1px solid #fff;
    color: #fff;
    margin-top: 30px;
  }
  .login-other {
    margin-top: 35px;
    width: 230px;
    height: 30px;
    color: #3d6688;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    span {
      margin: 0 15px;
      cursor: pointer;
    }
  }
}
</style>
