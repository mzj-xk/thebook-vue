<template>
  <div>
    <div>
      <el-col :span="30">
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 router="true">
          <el-menu-item index="/home/book/bookManage">
            <span style="item">书籍管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  setup () {

  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 100px !important;
  height: 100vh !important;
}
</style>