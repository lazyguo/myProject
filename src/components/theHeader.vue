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
            <el-dropdown-item @click="showTheme">切换主题</el-dropdown-item>
            <el-dropdown-item @click="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-drawer v-model="drawer" title="选择你要的主题" direction="ltr" size="20%" style="background:rgba(0,0,0,.5);color:#fff">
    <div class="themeBox" v-for="(item,index) in colorArr" :key="index + 'type2'">
      <div class="colorBox" :style="`background:${item.color}`" @click="changeTheme(item.theme,index)">三色堇</div>
    </div>
  </el-drawer>
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
const colorArr = [
  { 
    name:'三色堇',
    color:'#a7a0ce',
    theme:'primary1'
  },
  { 
    name:'克莱因',
    color:'#4774a5',
    theme:'primary2'
  },
  { 
    name:'天缥',
    color:'#81bb87',
    theme:'primary3'
  }
]
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
let drawer: boolean = ref(false)
const showTheme = () => {
  drawer.value = true
}
const changeTheme = (e,index) => {
  let colorBox = document.querySelectorAll('.colorBox')
  for (let i = 0; i < colorBox.length; i++) {
    if(i == index) {
      colorBox[i].style.border = '2px solid #fff'
    }else {
      colorBox[i].style.border = 'none'
    }
  }
  console.log('e', e)
  window.document.documentElement.setAttribute('data-theme', e)
}
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
@import '@/assets/css/theme.scss';
.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  @include theme_header($header-background-primary1);
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
.themeBox {
  display: flex;
  flex-direction: column;
  align-items:center;
  .colorBox {
    margin: 20px;
    width: 200px;
    height: 130px;
    color: #fff;
    text-align: center;
    line-height: 130px;
    cursor: pointer;
  }
}
::v-deep .el-drawer__header {
  color: blue !important;
}
::v-deep .el-dropdown-menu {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
