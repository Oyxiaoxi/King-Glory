<script setup lang="ts">
import axios from 'axios'
import type { CategoryListProps } from '~/types/categoryList'

const listsData = ref<CategoryListProps[]>([])
const fetch = async () => {
  await axios.get('categorise').then((res) => {
    listsData.value = res.data
  })
}

onMounted(() => {
  fetch()
})
</script>
<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      分类列表
    </h1>
    <el-table :data="listsData">
      <el-table-column prop="_id" label="ID" width="240" />
      <el-table-column prop="name" label="分类名称" />
    </el-table>
  </div>
</template>
