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
    await useHandleData(editItem, { id: props.id, name: `${innerValue.value.name}` }, `编辑 ${innerValue.value.name}`).then(() => {
      router.push('/items/list')
    })
  }

  else {
    await useHandleData(createItem, innerValue.value, `创建物品 ${innerValue.value.name} `).then(() => {
      router.push('/items/list')
    })
  }
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
        <el-input v-model="innerValue.icon" />
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
