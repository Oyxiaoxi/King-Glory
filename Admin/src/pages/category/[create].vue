<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'

const router = useRouter()
const categoryModel = ref({
  name: '',
})

const Save = async () => {
  await axios.post('categorise', categoryModel).then((res) => {
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
      新建分类
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
