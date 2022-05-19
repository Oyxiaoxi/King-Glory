<script setup lang="ts">
// axios 请求的方法名
import { createCategory, editCategory, fetchByIdCategory } from '~/api/modules/category'
import { useHandleData } from '~/hooks/useHandleData'
import { Category } from '~/store/modules/category'
const router = useRouter()
const store = Category()
const innerValue = ref({
  name: '',
  parent: [],
})

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  parents: [],
})

if (props.id) {
  const fetch = () => {
    fetchByIdCategory(props.id).then((result: unknown) => {
      innerValue.value = result
    })
  }
  onMounted(fetch)
}

const Save = async () => {
  // @useHandleData 提示信息
  // createCategory axios 请求的方法名 createCategory
  // params 参数 可以是对象或者数组 categories.value
  if (props.id) {
    await useHandleData(editCategory, { id: props.id, name: `${innerValue.value.name}` }, `编辑 ${innerValue.value.name}`).then(() => {
      router.push('/categories/list')
    })
  }

  else {
    await useHandleData(createCategory, innerValue.value, `创建分类 ${innerValue.value.name} `).then(() => {
      router.push('/categories/list')
    })
  }
}

const rawData = computed(() => {
  return store.fetchCategory
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ props.id ? '编辑' : '新建' }}分类
    </h1>
    <el-form label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="innerValue.parent">
          <el-option
            v-for="item in rawData"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="innerValue.name" />
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
