<script setup lang="ts">
</script>

<template>
  <el-container class="layout-container-demo" style="100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu router :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>内容管理
            </template>
            <el-menu-item-group>
              <template #title>
                分类管理
              </template>
              <el-menu-item index="/categories/create">
                新建分类
              </el-menu-item>
              <el-menu-item index="/categories/list">
                分类列表
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>
                物品管理
              </template>
              <el-menu-item index="/items/create">
                新建物品
              </el-menu-item>
              <el-menu-item index="/items/list">
                物品列表
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>
                英雄管理
              </template>
              <el-menu-item index="/heroes/create">
                新建英雄
              </el-menu-item>
              <el-menu-item index="/heroes/list">
                英雄列表
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template #title>
                文章管理
              </template>
              <el-menu-item index="/articles/create">
                新建文章
              </el-menu-item>
              <el-menu-item index="/articles/list">
                文章列表
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>

