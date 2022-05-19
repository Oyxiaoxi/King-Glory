<script setup lang="ts">
import { createHero, editHero, fetchByIdHero } from '~/api/modules/hero'
import { useHandleData } from '~/hooks/useHandleData'
import { Category } from '~/store/modules/category'
import { Item } from '~/store/modules/item'

const category = Category()
const item = Item()
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
  scores: {
    difficult: 0,
    skills: '',
    attack: '',
    survive: '',
  },
  skills: [{
    icon: '',
    name: '',
    description: '',
    tips: '',
  }],
  items1: [],
  items2: [],
  usageTips: '',
  battleTips: '',
  teamTips: '',
})

if (props.id) {
  const fetch = () => {
    fetchByIdHero(props.id).then((result: any) => {
      innerValue.value = Object.assign({}, innerValue.value, result)
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
      categories: innerValue.value.categories,
      scores: innerValue.value.scores,
      skills: innerValue.value.skills,
      items1: innerValue.value.items1,
      items2: innerValue.value.items2,
      usageTips: `${innerValue.value.usageTips}`,
      battleTips: `${innerValue.value.battleTips}`,
      teamTips: `${innerValue.value.teamTips}`,
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

const afterUploadSkill = (res: any) => {
  innerValue.value.skills[0].icon = res.url
}

const rawDataCategories = computed(() => {
  return category.fetchCategory
})
const rawDataItmes = computed(() => {
  return item.fetchItem
})

const activeName = ref('skills')
</script>

<template>
  <div p="x-10">
    <h1 text="left font-medium" p="y-10">
      {{ props.id ? '编辑' : '新建' }}英雄
    </h1>
    <el-form label-width="120px">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
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
          <el-form-item label="名称">
            <el-input v-model="innerValue.name" />
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="innerValue.title" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="innerValue.categories" multiple>
              <el-option
                v-for="item of rawDataCategories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <!-- <el-rate v-model="innerValue.scores.difficult" :max="9" show-score m-2/> -->
            <el-rate v-model="innerValue.scores.difficult" :max="9" show-score />
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="innerValue.scores.skills" :max="9" show-score />
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="innerValue.scores.attack" :max="9" show-score />
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="innerValue.scores.survive" :max="9" show-score />
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="innerValue.items1" multiple>
              <el-option
                v-for="item of rawDataItmes"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="innerValue.items2" multiple>
              <el-option
                v-for="item of rawDataItmes"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="innerValue.usageTips" type="textarea" />
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="innerValue.battleTips" type="textarea" />
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="innerValue.teamTips" type="textarea" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skills" text-left>
          <el-button @click.prevent="innerValue.skills.push({})">
            <el-icon>
              <Plus />
            </el-icon>
            添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap" p="x-4 y-4">
            <el-col v-for="(item, index) in innerValue.skills" :key="index" :md="12">
              <el-form-item label="技能名称">
                <el-input v-model="item.name" />
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="afterUploadSkill"
                  action="http://localhost:3000/admin/api/upload"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input v-model="item.description" type="textarea" />
              </el-form-item>
              <el-form-item label="技能小提示">
                <el-input v-model="item.tips" type="textarea" />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click.prevent="innerValue.skills.splice(index,1)">
                  删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item mt-8>
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

.el-rate .el-rate__item .el-rate__icon {
  margin-top: 0.7rem
}

#pane-skills .el-button .el-icon {
  margin-right: 0.2rem;
}
</style>
