<script setup lang="ts">
import { deleteCategory, fetchCategory } from '~/api/modules/category'
import { useHandleData } from '~/hooks/useHandleData'
import type { CategoryProps } from '~/store/interface'
import { Category } from '~/store/modules/category'

const store = Category()

const data = computed(() => {
  return store.getCategoryObj()
})

onMounted(async () => {
  const result = await fetchCategory()
  store.setCategory(result)
})

const remove = async (params: CategoryProps) => {
  await useHandleData(deleteCategory, { id: params._id }, `删除 ${params.name} 列表`)
  store.deleteCategory(params._id)
  store.getCategoryObj()
}

defineExpose({
  data,
  remove,
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      分类列表
    </h1>
    <el-table :data="data">
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
