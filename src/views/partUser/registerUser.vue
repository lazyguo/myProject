<template>
  <div class="home-contain">
    <div class="home-shade">
      <div class="register-back" @click="turnBack">返回主页</div>
      <div class="register-body">
        <div class="register-left">
          <img src="../../assets/imgs/bj.jpeg" />
        </div>
        <div class="register-right">
          <div class="register-title">注 册 用 户</div>
          <el-form
            class="register-form"
            ref="addUserForm"
            :model="ruleForm"
            label-width="70px"
            :rules="rules"
          >
            <el-form-item label="账户:" prop="username">
              <el-input v-model="ruleForm.username" />
            </el-form-item>
            <el-form-item label="昵称:" prop="nickname">
              <el-input v-model="ruleForm.nickname" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="ruleForm.password" />
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="ruleForm.email" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUser">确 定</el-button>
              <el-button>取 消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { addUserApi } from '@/api/login'
import { useRouter } from 'vue-router'
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
interface formItem {
  username: string
  password: string
  email: string
  nickname: string
}
let ruleForm = reactive<formItem>({
  username: '',
  password: '',
  email: '',
  nickname: ''
})
// 检验密码框
// const validatePassword = (value: string, callback: any) => {
//   var pwdRegex = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/)
//   if (value === '') {
//     callback(new Error('密码不能为空'))
//   } else if (!pwdRegex.test(value)) {
//     callback(new Error('密码必须为6-12位字母和数字组合'))
//   } else {
//     callback()
//   }
// }
const router = useRouter()
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不得为空', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度为3-10', trigger: 'blur' }
  ]
  // password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})
const addUser = () => {
  addUserApi(ruleForm).then(res => {
    if (res.status == 1) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    } else {
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    }
  })
}
const turnBack = () => {
  router.push('/login')
}
</script>

<style>
img {
  width: 100%;
  height: 100%;
}
.home-contain {
  width: 100%;
  height: 100%;
  background: url('../../assets/imgs/gy.jpeg') no-repeat;
}
.home-shade {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
}
.register-back {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 100px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-radius: 15px;
  color: rgb(72, 71, 71);
  border: 3px dashed rgb(245, 241, 241);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
}
.register-title {
  width: 200px;
  height: 66px;
  font-size: 28px;
  text-align: center;
  line-height: 66px;
  margin: 20px auto;
  border-radius: 20px;
  background: linear-gradient(
    45deg,
    rgba(254, 172, 94, 0.3),
    rgba(199, 121, 208, 0.3),
    rgba(75, 192, 200, 0.3)
  );
}
.register-body {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -300px;
  width: 700px;
  height: 500px;
  border: 4px dashed rgb(202, 174, 178);
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
}
.register-left {
  width: 45%;
  height: 95%;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.45);
}
.register-right {
  width: 49%;
  height: 96%;
  margin-left: 15px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.6);
}
.register-form {
  margin: 30px auto;
  width: 260px;
  height: 260px;
  padding: 30px 20px 0 0;
  border-radius: 15px;
  border: 5px dashed #fff;
}
.el-form-item__label {
  font-size: 18px;
  font-weight: 600;
}
</style>
