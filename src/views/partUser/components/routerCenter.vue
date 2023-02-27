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
            <el-button type="primary" size="small" @click="showDialog(scope.row)">添加</el-button>
            <el-button type="warning" size="small">修改</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="添加路由" width="35%">
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
import type { FormInstance, FormRules,resetFields } from 'element-plus'
//接口
import { getRouterListApi, addRouterApi } from '@/api/router_api'

//饿了么方法
import { ElMessage } from 'element-plus'

// ------------------------------------------------
let tableData = ref([])
let dialogVisible = ref(false)
// 获取列表信息
getRouterListApi().then(res => {
  tableData.value = res.data
})
// 弹框表单信息
let routerFormRef = ref<FormInstance>()
let rules = reactive<FormRules>({})
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
const showDialog = row => {
  const { id } = row
  routerForm.pid = id
  dialogVisible.value = true
}
const confrimRouter = (formEl: FormInstance | undefined) => {
  addRouterApi(routerForm).then(res => {
    if(res.status == 0) {
      ElMessage.success('添加成功')
    }else {
      ElMessage.error('添加失败')
    }
  })
  formEl.resetFields()
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.router_main {
  height: 100%;
  .router_header {
    height: 30px;
  }
  .router_body {
    margin: 10px;
  }
}
// 表格内背景颜色
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: rgba(119, 170, 160, 0.5); // 背景透明
  border: 0px;
  color: #fff; // 修改字体颜色
  height: 5px;
  text-align: center;
}
// 修改高亮当前行颜色
::v-deep .el-table tbody tr:hover > td {
  background: rgba(87, 137, 140, 0.5) !important;
}
::v-deep .el-input__wrapper {
  display: flex;
  // justify-content: space-between;
  flex: 1;
  flex-grow: 0;
  width: 140px;
  .el-input__inner {
    width: inherit;
  }
}
</style>
