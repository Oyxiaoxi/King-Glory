<script setup lang="ts">
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

import { useListStore } from '~/store/List'
const store = useListStore()
const ListData = computed(() => { return store.getListData })
const remove = (row: any) => {
  ElMessageBox.confirm(
    `是否确定要删除分类 "${row.name}" 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      await axios.delete(`/categorise/${row._id}`)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      store.fetchListData()
    })
}

onMounted(() => {
  store.fetchListData()
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      分类列表
    </h1>
    <el-table :data="ListData">
      <el-table-column prop="_id" label="ID" width="240" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <!-- <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row._id)"> -->
          <el-button type="text" size="small" @click="$router.push(`/category/edit/${scope.row._id}`)">
            编辑
          </el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
