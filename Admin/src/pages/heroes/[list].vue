<script setup lang="ts">
import { deleteHero, fetchHero } from '~/api/modules/hero'
import { useHandleData } from '~/hooks/useHandleData'
import type { HeroProps } from '~/store/interface'
import { Hero } from '~/store/modules/hero'

const store = Hero()

onMounted(() => {
  fetchHero().then((res) => {
    return store.setHero(res)
  })
})

// 删除某一个英雄
const remove = async (params: HeroProps) => {
  await useHandleData(deleteHero, { id: params._id }, `删除英雄 ${params.name} `).then(() => {
    fetchHero().then((res) => {
      return store.setHero(res)
    })
  })
}

const heroes = computed(() => {
  return store.fetchHero
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      英雄列表
    </h1>
    <el-table :data="heroes">
      <el-table-column prop="_id" label="ID" width="240" />
      <el-table-column prop="name" label="英雄" />
      <el-table-column prop="title" label="称号" />
      <el-table-column prop="avatar" label="图标">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="right" width="auto">
            <template #default>
              <el-tag>{{ scope.row.avatar }}</el-tag>
            </template>
            <template #reference>
              <img :src="scope.row.avatar" alt="" h-8>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button type="text" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">
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
