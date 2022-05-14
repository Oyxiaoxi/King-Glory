<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'

const router = useRouter()
const props = defineProps<CategoryProps>()

const categoryModel = ref({
  name: '',
})

interface CategoryProps {
  id?: string
}

if (props.id) {
  axios.get(`/categorise/${props.id}`).then((res) => {
    categoryModel.value = res.data
  })
}

const Save = async () => {
  // 如果路由传递了id，则是编辑操作
  if (props.id) {
    await axios.put(`categorise/${props.id}`, categoryModel.value).then((res) => {
      router.push('/category/list')
      ElMessage({
        type: 'success',
        showClose: true,
        message: '更新成功',
      })
    })
  }
  // 创建操作
  await axios.post('categorise', categoryModel.value).then((res) => {
    router.push('/category/list')
    ElMessage({
      type: 'success',
      showClose: true,
      message: '保存成功',
    })
  }).catch((error) => {
    ElMessage({
      type: 'error',
      showClose: true,
      message: error.message,
    })
  })
}

</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ id ? '编辑' : '新建' }}分类
    </h1>
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="categoryModel.name" />
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
