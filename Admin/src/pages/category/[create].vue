<script setup lang="ts">
import { fetchCategory } from '~/api/modules/category'
import { Category } from '~/store/modules/category'

const store = Category()

onMounted(async () => {
  const result = await fetchCategory()
  store.setCategory(result)
})

const data = computed(() => {
  return store.getCategoryObj()
})

defineExpose({
  data,
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ id ? '编辑' : '新建' }}分类
    </h1>
    <el-form label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="data" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          @click.prevent="Save"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
