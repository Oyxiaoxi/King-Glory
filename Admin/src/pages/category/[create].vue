<script setup lang="ts">
// axios 请求的方法名
import { createCategory } from '~/api/modules/category'
import { useHandleData } from '~/hooks/useHandleData'
import type { CategoryProps } from '~/store/interface'
import { Category } from '~/store/modules/category'

const store = Category()
// const route = useRoute()

const categories = ref({
  name: '' as string,
})

// const categroyId = computed(() => {
//   return route.params.id
// })
// if (categroyId)
//   categories.value = store.getCategoryById('categroyId')

// const data = computed(() => {
//   return store.getAllCategoryObj()
// })

const Save = async (params: CategoryProps) => {
  // @useHandleData 提示信息
  // createCategory axios 请求的方法名 createCategory
  // params 参数 可以是对象或者数组 categories.value
  await useHandleData(createCategory, categories.value, `创建 ${categories.value.name} 分类`)
}
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ categroyId ? '编辑' : '新建' }}分类
    </h1>
    <el-form label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="data">
          <el-option
            v-for="item in data"
            :key="item._id"
            :path="item._id"
            :label="item.name"
            :name="item._id"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="categories.name" />
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
