<script setup lang="ts">
import { deleteCategory, fetchCategory } from '~/api/modules/category'
import { useHandleData } from '~/hooks/useHandleData'
import type { CategoryProps } from '~/store/interface'
import { Category } from '~/store/modules/category'

const store = Category()
const categories = computed(() => {
  return store.fetchCategory
})

// 页面加载时获取分类列表
onMounted(() => {
  fetchCategory().then((res) => {
    return store.setCategory(res)
  })
})

// 删除某一个分类
const remove = async (params: CategoryProps) => {
  await useHandleData(deleteCategory, { id: params._id }, `删除分类 ${params.name} `).then(() => {
    fetchCategory().then((res) => {
      return store.setCategory(res)
    })
  })
}

defineExpose({
  remove,
  categories,
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      分类列表
    </h1>
    <el-table :data="categories">
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
