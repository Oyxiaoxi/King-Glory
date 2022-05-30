<script setup lang="ts">
import axios from 'axios'
import { VueEditor } from 'vue3-editor'
// axios 请求的方法名
import { createArticle, editArticle, fetchByIdArticle } from '~/api/modules/article'
import { useHandleData } from '~/hooks/useHandleData'
import { Category } from '~/store/modules/category'
const router = useRouter()
const store = Category()
const innerValue = ref({
  name: '',
  title: '',
  body: '',
  categories: [],
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
    fetchByIdArticle(props.id).then((result: unknown) => {
      innerValue.value = result
    })
  }
  onMounted(fetch)
}

const Save = async () => {
  // @useHandleData 提示信息
  // createArticle axios 请求的方法名 createArticle
  // params 参数 可以是对象或者数组 innerValue.value
  if (props.id) {
    await useHandleData(editArticle, {
      id: props.id,
      title: `${innerValue.value.title}`,
      body: `${innerValue.value.body}`,
    }, `编辑 ${innerValue.value.title}`).then(() => {
      router.push('/articles/list')
    })
  }

  else {
    await useHandleData(createArticle, innerValue.value, `创建文章 ${innerValue.value.title} `).then(() => {
      router.push('/articles/list')
    })
  }
}

const rawData = computed(() => {
  return store.fetchCategory
})

const handleImageAdded = (file: string | Blob, Editor: { insertEmbed: (arg0: any, arg1: string, arg2: any) => void }, cursorLocation: any, resetUploader: () => void) => {
  const formData = new FormData()
  formData.append('file', file)

  axios({
    url: 'http://localhost:3000/admin/api/upload',
    method: 'POST',
    data: formData,
  })
    .then((result) => {
      const url = result.data.url // Get url from response
      Editor.insertEmbed(cursorLocation, 'image', url)
      resetUploader()
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ props.id ? '编辑' : '新建' }}文章
    </h1>
    <el-form label-width="120px">
      <el-form-item label="所属分类">
        <el-select v-model="innerValue.categories" multiple>
          <el-option
            v-for="item in rawData"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="innerValue.title" />
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="innerValue.body"
          use-custom-image-handler
          w-full
          text-left @image-added="handleImageAdded"
        />
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
