<script setup lang="ts">
import { createItem, editItem, fetchByIdItem } from '~/api/modules/item'
import { useHandleData } from '~/hooks/useHandleData'
const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

if (props.id) {
  const fetch = () => {
    fetchByIdItem(props.id).then((result: any) => {
      innerValue.value = result
    })
  }
  onMounted(fetch)
}

const innerValue = ref({
  name: '',
  icon: '',
})

const Save = async () => {
  if (props.id) {
    await useHandleData(editItem, { id: props.id, name: `${innerValue.value.name}`, icon: `${innerValue.value.icon}` }, `编辑 ${innerValue.value.name}`).then(() => {
      router.push('/items/list')
    })
  }

  else {
    await useHandleData(createItem, innerValue.value, `创建物品 ${innerValue.value.name} `).then(() => {
      router.push('/items/list')
    })
  }
}

const afterUpload = (res: any) => {
  innerValue.value.icon = res.url
}
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ props.id ? '编辑' : '新建' }}物品
    </h1>
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="innerValue.name" />
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="afterUpload"
          action="http://localhost:3000/admin/api/upload"
        >
          <img v-if="innerValue.icon" :src="innerValue.icon" class="avatar">
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
