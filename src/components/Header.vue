<template>
  <el-menu :default-active="$route.path"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect"
           router="true">
    <el-menu-item index="/home/book"
                  class="item">书籍</el-menu-item>
    <el-menu-item index="/home/user"
                  class="item">用户</el-menu-item>
    <el-menu-item index="/home/admin"
                  class="item">管理员</el-menu-item>
  </el-menu>

</template>




<script>
import { ref } from '@vue/reactivity'

export default {
  name: 'Header',
  setup () {

    const activeIndex = ref('1')
    const handleSelect = () => {

    }
    return {
      activeIndex,
      handleSelect,
    }
  }
}
</script>

<style  scoped>
a {
  text-decoration: none;
}

.item {
  width: 100px;
}
</style>