<template>
  <div class="main_center">
    <div class="main_header">
      <el-breadcrumb :separator-icon="ArrowRight" style="color: #fff">
        <el-breadcrumb-item>哈喽</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main_body">
      <el-table
        :data="userData"
        style="width: 100%"
        class="infoTable"
        v-loading="loading"
        :header-cell-style="{
          color: '#fff',
          background: '#9fdaa4',
          fontWeight: '700'
        }"
      >
        <el-table-column type="index" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="power" label="等级">
          <template v-slot="scope">
            <el-tag type="warning" v-if="scope.row.power == 'super'">{{
              dictTrans('等级', scope.row.power)
            }}</el-tag>
            <el-tag v-if="scope.row.power == 'admin'">{{
              dictTrans('等级', scope.row.power)
            }}</el-tag>
            <el-tag type="success" v-if="scope.row.power == 'oridinary'">{{
              dictTrans('等级', scope.row.power)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              style="--el-switch-off-color: #ff4949"
              :before-change="() => switchBeforeChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="warning" size="small" @click="editUserForm(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="removeUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页功能 -->
    <el-pagination
      class="pageNation"
      v-model:current-page="query.pageNum"
      v-model:page-size="query.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="query.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
  <!-- 修改添加用户信息弹框 -->
  <el-dialog v-model="userDialog" :title="optionText + '用户'" width="30%" center>
    <div>
      <el-form
        label-position="top"
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
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
        <el-form-item label="头像上传:">
          <el-upload
            class="avatar-uploader"
            action="/api/upload/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.imgUrl" :src="userForm.imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="userDialog = false">取消</el-button>
        <el-button type="primary" @click="submitUserForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// 引入依赖方法
import { ArrowRight, Plus } from '@element-plus/icons-vue'
import { reactive, ref, nextTick, Vue, defineProps, defineExpose, toRaw } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
// 引入接口
import { getUserListApi, editUserApi, removeUserApi, removeImgApi } from '@/api/user_api'
// 引入公用方法
import { dict, dictTrans } from '@/utils/util.dict'
import { clear } from '@/utils/util.common'
// 引入pinia
import { loginStore } from '@/storePinia/index'
// 引入公共验证规则
import {
  validPassword,
  validatePassword,
  checkNoChinese,
  validateEmail
} from '@/utils/util.validate'
import { remove } from 'js-cookie'
const store = loginStore()
// 定义表格数据
let userData = ref([
  {
    username: 'string',
    nickName: 'string',
    email: 'string',
    power: 'string',
    status: 'number'
  }
])
let loading = ref(false) //loading
// 分页功能
let query = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
// 获取页面列表数据
const getUserList = params => {
  loading.value = true
  getUserListApi(params).then(res => {
    userData.value = res.data
    query.total = res.total
    loading.value = false
  })
}

let optionText: string = ref('修改') // 弹框标题
let userDialog: boolean = ref(false) // 控制弹框
// 处理字典数据
const levelDict = dict('等级').map(item => {
  return {
    label: item.optName,
    value: item.optCode
  }
})
// 饿了么定义
const formSize = ref('default')
const userFormRef = ref<FormInstance>()
// 表单数据
let userForm = reactive({
  username: '',
  nickname: '',
  email: '',
  power: 'oridinary',
  status: 1,
  imgUrl: ''
})
// 用户表单规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不得为空', trigger: 'blur' },
    { validator: checkNoChinese, trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '昵称不得为空', trigger: 'blur' },
    { min: 3, max: 10, message: '昵称长度为3-10', trigger: 'blur' }
  ]
  // email: [{ validator: validateEmail, trigger: 'blur' }]
})
// 修改用户信息
const editUserForm = row => {
  clear(userForm)
  userForm = Object.assign(userForm, row)
  userDialog.value = true
}
let deleteUrl = ref<string>('')
// 提交修改
const submitUserForm = () => {
  userDialog.value = false
  editUserApi(userForm).then(res => {
    if (res.status == 0) {
      if (deleteUrl.value) {
        removeImgApi(deleteUrl.value).then(res => {
          console.log('成功')
        })
      }
      ElMessage({
        message: '更新用户信息成功',
        type: 'success'
      })
      let info = JSON.parse(localStorage.getItem('userInfo'))
      let userName = info.userInfo.username
      if (userName == userForm.username) {
        store.getInfo(userForm.username)
      }
      getUserList()
    } else {
      ElMessage({
        message: '更新用户信息失败',
        type: 'error'
      })
    }
  })
}
getUserList(query)
const handleSizeChange = (val: number) => {
  query.pageSize = val
  getUserList(query)
}
const handleCurrentChange = (val: number) => {
  query.pageNum = val
  getUserList(query)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
  deleteUrl.value = userForm.imgUrl
}
// 头像上传成功回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  userForm.imgUrl = response.data
}
// 更新用户状态
const switchBeforeChange = row => {
  return new Promise(resolve => {
    setTimeout(() => {
      row.status = row.status == 0 ? 1 : 0
      userForm = Object.assign(toRaw(userForm), toRaw(row))
      editUserApi(userForm).then(res => {
        if (res.status == 0) {
          ElMessage({
            message: '更新用户信息成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '更新用户信息失败',
            type: 'error'
          })
        }
      })
      return resolve(false)
    }, 50)
  })
}
// 删除用户
const removeUser = id => {
  ElMessageBox.confirm('确定要删除该用户?', '删除提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      removeUserApi(id).then(res => {
        ElMessage.success('删除成功')
        getUserList()
      })
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}
</script>

<style lang="scss" scoped>
.main_center {
    height: 100%;
    position: relative;
    .pageNation {
        position: absolute;
        bottom: 0;
    }
}
.main_header {
  height: 30px;
}
// 表格内背景颜色
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: rgba(126, 182, 118, 0.5); // 背景透明
  border: 0px;
  color: #fff; // 修改字体颜色
  height: 5px;
  text-align: center;
}
// 修改高亮当前行颜色
::v-deep .el-table tbody tr:hover > td {
  background: rgba(245, 206, 199, 0.5) !important;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
::v-deep .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #ff9800 !important;
}
</style>
