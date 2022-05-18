<script setup lang="ts">
import { fetchCategory } from '~/api/modules/category'
import { createHero, editHero, fetchByIdHero } from '~/api/modules/hero'
import { useHandleData } from '~/hooks/useHandleData'
import { Category } from '~/store/modules/category'
const category = Category()
const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

const innerValue = ref({
  name: '',
  avatar: '',
  title: '',
  categories: [],
})

if (props.id) {
  const fetch = () => {
    fetchByIdHero(props.id).then((result: any) => {
      innerValue.value = result
    })
  }
  onMounted(fetch)
}

const Save = async () => {
  if (props.id) {
    await useHandleData(editHero, {
      id: props.id,
      name: `${innerValue.value.name}`,
      avatar: `${innerValue.value.avatar}`,
      title: `${innerValue.value.title}`,
      categories: `${innerValue.value.categories}`,
    }, `编辑 ${innerValue.value.name}`).then(() => {
      router.push('/heroes/list')
    })
  }

  else {
    await useHandleData(createHero, innerValue.value, `创建英雄 ${innerValue.value.name} `).then(() => {
      router.push('/heroes/list')
    })
  }
}

const afterUpload = (res: any) => {
  innerValue.value.avatar = res.url
}

const rawData = computed(() => {
  return category.fetchCategory
})
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ props.id ? '编辑' : '新建' }}英雄
    </h1>
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="innerValue.name" />
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="innerValue.title" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="innerValue.categories" multiple>
          <el-option
            v-for="item of rawData"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
        <!-- <el-input v-model="innerValue.categories" /> -->
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="afterUpload"
          action="http://localhost:3000/admin/api/upload"
        >
          <img v-if="innerValue.avatar" :src="innerValue.avatar" class="avatar">
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
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

<style>
.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  text-align: center;
}
</style>
