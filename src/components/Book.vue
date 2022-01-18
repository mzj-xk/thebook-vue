<template>
  <div class="container">
    <div class="left">
      <el-col :span="30">
        <el-menu default-active="1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-menu-item index="1">
            <span style="item">书籍管理</span>
          </el-menu-item>

        </el-menu>
      </el-col>
    </div>
    <div class="right">
      <div class="table">
        <el-table :data="tableData"
                  stripe
                  style="">
          <el-table-column prop="name"
                           label="书名" />
          <el-table-column prop="cover"
                           label="封面" />
          <el-table-column prop="author"
                           label="作者" />
          <el-table-column prop="press"
                           label="出版社" />
          <el-table-column prop="producer"
                           label="出品方" />
          <el-table-column prop="pagesNumber"
                           label="页数" />
          <el-table-column prop="price"
                           label="价格" />

        </el-table>
      </div>
      <div class="demo-pagination-block">
        <el-pagination v-model:currentPage="currentPage"
                       :page-sizes="[10, 15, 20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import request from '../utils/request'
export default {
  setup () {
    let tableData = ref([])
    let total = ref(0)
    let pageSize = ref(10)
    let currentPage = ref(1)
    const load = () => {
      request.get('/api//book/findAll', {
        params: {
          pageNum: 1,
        }
      }).then(res => {
        tableData.value = res.data.records
        total.value = res.data.total
        console.log(tableData.value)
      })
    }

    load()
    return {
      load,
      tableData,
      total,
      pageSize,
      currentPage
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
}

.right {
  width: 100%;
}

.el-menu-vertical-demo {
  width: 100px !important;
  height: 100vh !important;
}
</style>