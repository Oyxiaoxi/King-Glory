<script setup lang="ts">
import { deleteItem, fetchItem } from '~/api/modules/item'
import { useHandleData } from '~/hooks/useHandleData'
import type { ItemProps } from '~/store/interface'
import { Item } from '~/store/modules/item'

const store = Item()

onMounted(() => {
  fetchItem().then((res) => {
    return store.setItem(res)
  })
})

// 删除某一个物品
const remove = async (params: ItemProps) => {
  await useHandleData(deleteItem, { id: params._id }, `删除物品 ${params.name} `).then(() => {
    fetchItem().then((res) => {
      return store.setItem(res)
    })
  })
}

const items = computed(() => {
  return store.fetchItem
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      物品列表
    </h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240" />
      <el-table-column prop="name" label="物品" />
      <el-table-column prop="icon" label="图标">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="right" width="auto">
            <template #default>
              <el-tag>{{ scope.row.icon }}</el-tag>
            </template>
            <template #reference>
              <img :src="scope.row.icon" alt="" h-8>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template #default="scope">
          <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">
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
