<template>
  <div class="router_main">
    <!-- 导航栏 -->
    <div class="router_header">
      <el-breadcrumb :separator-icon="ArrowRight" style="color: #fff">
        <el-breadcrumb-item>哈喽</el-breadcrumb-item>
        <el-breadcrumb-item>路由管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 中心区域 -->
    <div class="router_body">
      <el-table
        :data="tableData"
        v-loading="loading"
        row-key="id"
        :header-cell-style="{
          color: '#fff',
          background: '#a0ccb1',
          fontWeight: '700'
        }"
      >
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="sort" label="排序" width="180" />
        <el-table-column prop="path" label="请求地址" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="powerMark" label="权限标识" />
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="small" @click="showDialog(scope.row, 'add')"
              >添加</el-button
            >
            <el-button type="warning" size="small" @click="showDialog(scope.row, 'update')"
              >修改</el-button
            >
            <el-button type="danger" size="small" @click="removeRouter(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" :title="title + '路由'" width="35%">
      <el-form
        ref="routerFormRef"
        :model="routerForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm test"
        inline
      >
        <el-form-item label="id" prop="id">
          <el-input v-model="routerForm.id" disabled />
        </el-form-item>
        <el-form-item label="父id" prop="pid">
          <el-input v-model="routerForm.pid" disabled />
        </el-form-item>
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="routerForm.name" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="routerForm.path" />
        </el-form-item>
        <el-form-item label="权限标识" prop="powerMark">
          <el-input v-model="routerForm.powerMark" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="routerForm.type" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="routerForm.sort" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="routerForm.icon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confrimRouter(routerFormRef)"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 引入依赖方法
import { ArrowRight } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, resetFields } from 'element-plus'
//接口
import { getRouterListApi, addRouterApi, updateRouterApi, removeRouterApi } from '@/api/router_api'

//饿了么方法
import { ElMessage, ElMessageBox } from 'element-plus'
// 引入公用方法
import { clear } from '@/utils/util.common'

// ------------------------------------------------
// 总列表（存储路由列表信息）
let tableData = ref([])
let dialogVisible:boolean = ref(false) //弹框显隐
let title:string = ref('新增') // 动态弹框白哦提
let loading:boolean = ref(false)
// 获取列表信息
const getRouterList = () => {
  loading.value = true
  getRouterListApi().then(res => {
    tableData.value = res.data
    loading.value = false
  })
}
getRouterList()
let routerFormRef = ref<FormInstance>() // 定义表单ref
let rules = reactive<FormRules>({}) // 定义表单规则
// 弹框表单信息
let routerForm = reactive({
  id: '',
  pid: '',
  name: '',
  path: '',
  icon: '',
  sort: '',
  powerMark: '',
  type: ''
})
// 打开添加/编辑弹框
const showDialog = (row, type) => {
  clear(routerForm)
  if (type == 'add') {
    const { id } = row
    routerForm.pid = id
    title.value = '新增'
  } else if (type == 'update') {
    routerForm = Object.assign(routerForm, row)
    title.value = '更新'
  }
  dialogVisible.value = true
}
// 添加/编辑路由信息
const confrimRouter = (formEl: FormInstance | undefined) => {
  if (title.value == '新增') {
    addRouterApi(routerForm).then(res => {
      if (res.status == 0) {
        ElMessage.success('添加成功')
        getRouterList()
      } else {
        ElMessage.error('添加失败')
      }
    })
  } else if (title.value == '更新') {
    updateRouterApi(routerForm).then(res => {
      if (res.status == 0) {
        ElMessage.success('更新成功')
        getRouterList()
      }
    })
  }
  formEl.resetFields()
  dialogVisible.value = false
}
// 删除路由信息
const removeRouter = id => {
  ElMessageBox.confirm('是否要删除当前路由？', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      removeRouterApi(id).then(res => {
        if (res.status == 0) {
          ElMessage.success('删除成功')
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
  getRouterList()
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/table.scss";
.router_main {
  height: 100%;
  .router_header {
    height: 30px;
  }
  .router_body {
    margin: 10px;
  }
}
</style>
