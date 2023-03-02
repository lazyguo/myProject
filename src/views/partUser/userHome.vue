<template>
  <div class="user-container">
    <el-container style="height: 100%">
      <!-- 头部区域 -->
      <el-header style="padding: 0">
        <theHeader></theHeader>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" class="user_aside">
          <theAside @menuInfo="getMenuInfo" :editableTabsValue="editableTabsValue"></theAside>
        </el-aside>
        <!-- 主体内容 -->
        <el-main class="user_main">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            editable
            class="demo-tabs"
            style="height: 100%"
            @edit="handleTabsEdit"
            @tab-change="changeTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.id"
              :label="item.name"
              :name="item.id"
              class="tabPane"
            >
              <router-view></router-view>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// 引入公共组件
import theHeader from '@/components/theHeader.vue'
import theAside from '@/components/theAside.vue'
import { Menu } from '@element-plus/icons-vue'
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 定义当前窗口
let editableTabsValue = ref('1m')
// 定义初始窗口列表
const editableTabs = ref([
  {
    id: '1m',
    name: '用户管理',
    routeName: 'UserCenter'
  }
])
// 获取窗口列表
const getMenuInfo = value => {
  let isState = editableTabs.value.some(item => {
    return item.name == value.name
  })
  if (!isState) {
    editableTabs.value.push(value)
    editableTabsValue.value = value.id
  }else {
     editableTabsValue.value = value.id
  }
}
// 切换窗口
const changeTab = e => {
  editableTabs.value.forEach(item => {
    if (item.id == e) {
      router.push({ name: item.routeName })
    }
  })
}
// 删除窗口
const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    let isOnly = false
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.id === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.id
            const { routeName } = nextTab
            router.push({ name: routeName })
          } else {
            isOnly = true
          }
        }
      })
    }
    if (!isOnly) {
      editableTabsValue.value = activeName
      editableTabs.value = tabs.filter(tab => tab.id !== targetName)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
.user-container {
  width: 100%;
  height: 100%;
}
.user_aside {
  @include theme_aside($aside-background-primary1);
}
.user_main {
  @include theme_main($main-background-primary1);
}
::v-deep .el-tabs {
  --el-tabs-header-height: 30px !important;
}
::v-deep .el-tabs__new-tab {
  display: none;
}
::v-deep .el-tabs--card > .el-tabs__header {
  margin-bottom: 5px;
}
::v-deep .el-tabs__item {
  color: #000;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none;
  border: 1px solid rgba($color: #fff, $alpha: 0.8);
  background-color: rgba($color: #fff, $alpha: 1.0);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
::v-deep .el-tabs__content {
  height: 98% !important;
}
::v-deep .el-tabs__item.is-active {
  color: #2d77ae;
}
</style>
