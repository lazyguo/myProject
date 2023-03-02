<template>
  <div class="personal-conter">
    <div class="personal-header">
      <div class="trunBack" @click="turnBack">返 回</div>
    </div>
    <div class="personal-body">
      <!-- 头像 -->
      <el-card class="box-card">
        <el-avatar :size="165" :src="fileImg == '' ? demoImg : fileImg" />
        <div class="card-content">{{ store.userInfo.nickname }}</div>
      </el-card>

      <!-- 侧边栏 -->
      <!-- <el-card class="box-BottomCard">
        <div class="card-header">
          <span>个人资料</span>
        </div>
        <div v-for="o in sidebarItem" :key="o" class="text-item">{{ o }}</div>
        <div class="card-header">
          <span>消息中心</span>
        </div>
        <div v-for="o in sidebarXItem" :key="o" class="text-item">{{ o }}</div>
        <div class="card-header">
          <span>XXXX</span>
        </div>
        <div v-for="o in sidebarXxItem" :key="o" class="text-item">{{ o }}</div>
      </el-card> -->
      <el-card class="box-BottomCard">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1" >
            <template #title>
              <span>个人资料</span>
            </template>
            <el-menu-item index="1-1">基本资料</el-menu-item>
            <el-menu-item index="1-2">修改头像</el-menu-item>
            <el-menu-item index="1-3">修改密码</el-menu-item>
            <el-menu-item index="1-4">身份认证</el-menu-item>
          </el-sub-menu>
          <!-- <el-menu-item index="2">
            <span>消息中心</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item> -->
        </el-menu>
      </el-card>
      <!-- 右侧主体部分 -->
      <el-card class="box-RightTopCard">
        <span>个人资料</span>
      </el-card>
      <el-card class="box-RightCard">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="基本资料" name="first">
            <el-form :model="userForm" label-width="140px" disabled class="formStyle">
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="userForm.username" />
              </el-form-item>
              <el-form-item label="昵称:" prop="nickname">
                <el-input v-model="userForm.nickname" />
              </el-form-item>
              <el-form-item label="邮箱:" prop="email">
                <el-input v-model="userForm.email" />
              </el-form-item>
              <el-form-item label="权限等级:" prop="power">
                <el-select v-model="userForm.power" class="m-2" placeholder="选择权限等级">
                  <el-option
                    v-for="item in levelDict"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="头像:">
                <img v-if="userForm.imgUrl" :src="userForm.imgUrl" class="avatar" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="修改头像" name="second">修改头像</el-tab-pane>
          <el-tab-pane label="修改密码" name="third">修改密码</el-tab-pane>
          <el-tab-pane label="身份认证" name="fourth">身份认证</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import { loginStore } from '@/storePinia/index'
import { reactive } from 'vue'
import { dict } from '@/utils/util.dict'

const activeName = ref('first')
// 表单数据
let userForm = reactive({
  username: '',
  nickname: '',
  email: '',
  power: 'oridinary',
  status: 1,
  imgUrl: ''
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// 处理字典数据
const levelDict = dict('等级').map(item => {
  return {
    label: item.optName,
    value: item.optCode
  }
})
const fileImg = ref('')
const router = useRouter()
const store = loginStore()
const demoImg = require('@/assets/imgs/ava.png')
userForm = store.userInfo
// 判断该账户是否有头像，如有则使用，无则用默认
fileImg.value = store.userInfo.imgUrl

const turnBack = () => {
  router.go(-1)
}
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
  position: relative;
  width: 75%;
  height: 800px;
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
      padding: 5px;
      border-bottom: 1px solid #ccc;
    }
    .text-item {
      text-align: center;
      width: 90%;
      margin: 10px 0;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .box-RightTopCard {
    position: absolute;
    width: 72%;
    height: 55px;
    top: 0;
    right: 0;
    line-height: 25px;
    font-size: 22px;
  }
  .box-RightCard {
    position: absolute;
    width: 72%;
    height: 89%;
    top: 62px;
    right: 0;
    .formStyle {
      padding-top: 60px;
      width: 600px;
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
  }
}
::v-deep .el-card__header {
  padding: 10px 0;
}
::v-deep .el-card__body {
  padding: 15px;
}
</style>
