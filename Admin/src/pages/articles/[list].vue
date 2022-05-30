<script setup lang="ts">
import { deleteArticle, fetchArticle } from '~/api/modules/article'
import { useHandleData } from '~/hooks/useHandleData'
import type { ArticleProps } from '~/store/interface'
import { Article } from '~/store/modules/article'

const store = Article()

// 页面加载时获取文章列表
onMounted(() => {
  fetchArticle().then((res) => {
    return store.setArticle(res)
  })
})

// 删除某一个文章
const remove = async (params: ArticleProps) => {
  await useHandleData(deleteArticle, { id: params._id }, `删除文章 ${params.title} `).then(() => {
    fetchArticle().then((res) => {
      return store.setArticle(res)
    })
  })
}

const articles = computed(() => {
  return store.fetchArticle
})

// defineExpose({
//   remove,
//   categories,
// })
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      文章列表
    </h1>
    <el-table :data="articles">
      <el-table-column prop="_id" label="ID" width="240" />
      <el-table-column prop="title" label="文章标题" />
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <!-- <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row._id)"> -->
          <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">
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
