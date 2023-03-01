<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo asideMenu"
    text-color="#fff"
    active-text-color="#6f6994"
    v-for="item in list"
    :key="item.id"
  >
    <el-menu-item :index="item.id" @click="menuChange(item)">
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, reactive, defineEmits, defineProps,watch } from 'vue'
import { UserFilled, Promotion, Platform } from '@element-plus/icons-vue'
const props = defineProps({
  editableTabsValue: {
    type: String,
    default: '1m'
  }
})
watch(() => props.editableTabsValue,(newVal) => {
  activeIndex.value = newVal
})
const router = useRouter()
const emit = defineEmits(['menuInfo'])
let activeIndex = ref('1m')
let list = [
  {
    id: '1m',
    name: '用户管理',
    routeName: 'UserCenter',
    icon: UserFilled
  },
  {
    id: '2m',
    name: '路由管理',
    routeName: 'RouterCenter',
    icon: Promotion
  },
  {
    id: '3m',
    name: '可视化大屏',
    routeName: 'bigVisu',
    icon: Platform
  }
]
const menuChange = item => {
  router.push({ name: item.routeName })
  activeIndex.value = item.id
  emit('menuInfo', item)
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
.asideMenu {
  @include theme_aside_menu($aside-menu-primary1);
  border: none;
}
::v-deep .el-menu-item:hover {
  background: rgba($color: #000000, $alpha: 0.1) !important;
}
</style>
