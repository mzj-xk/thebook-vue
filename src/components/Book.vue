<template>
  <div class="container">
    <div class="left">
      <el-col :span="30">
        <el-menu default-active="1"
                 class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <span style="item">书籍管理</span>
          </el-menu-item>

        </el-menu>
      </el-col>
    </div>
    <div class="right">
      <div class="tools">
        <el-button type="primary"
                   @click="create">新增</el-button>
        <div>
          <el-input v-model="keywords"
                    placeholder="请输入书名或者ISBN号"
                    style="width: 190px; margin-left: 5px"
                    clearable></el-input>
          <el-button type="primary"
                     style="margin-left: 5px"
                     @click="search">查询</el-button>
          <el-button type="primary"
                     style="margin-left: 5px"
                     @click="load">全部</el-button>
        </div>
      </div>
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
          <el-table-column prop="pagesNumber"
                           label="页数" />
          <el-table-column prop="price"
                           label="价格" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button @click="handleEdit(scope.row)"
                         type="text"
                         size="small">编辑</el-button>
              <el-popconfirm title="这是一段内容确定删除吗？"
                             @confirm="handleDetele(scope.row.id)">
                <template #reference>
                  <el-button type="text"
                             size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
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
    <el-dialog v-model="dialogVisible"
               width="30%">
      <el-form :model="form"
               label-width="70px">
        <el-form-item label="书名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="封面链接">
          <el-input v-model="form.cover"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
        <el-form-item label="出品方">
          <el-input v-model="form.producer"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="页数">
          <el-input v-model="form.pagesNumber"></el-input>
        </el-form-item>
        <el-form-item label="ISBN">
          <el-input v-model="form.isbn"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click=cancel>取 消</el-button>
          <el-button type="primary"
                     @click="dataUp">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import request from '../utils/request'
import { ElMessage } from 'element-plus'
export default {
  setup () {
    let tableData = ref([])
    let total = ref(0)
    let pageSize = ref(10)
    let currentPage = ref(1)
    let isUpdate = ref(false)
    const load = () => {
      request.get('/api/book/findAll', {
        params: {
          pageNum: 1,
        }
      }).then(res => {
        tableData.value = res.data.records
        total.value = res.data.total
      })
    }
    // 打开页面是自动获取数据
    load()

    // 添加书籍功能
    // 是否显示表单弹窗
    let dialogVisible = ref(false)
    // 创建一个空表单
    let form = reactive({
      id: '',
      name: '',
      cover: '',
      author: '',
      press: '',
      producer: '',
      price: '',
      pagesNumber: '',
      isbn: ''
    })
    const create = () => {
      isUpdate.value = false
      // 清空表单
      form.id = ''
      form.name = ''
      form.cover = ''
      form.author = ''
      form.press = ''
      form.producer = ''
      form.price = ''
      form.pagesNumber = ''
      form.isbn = ''
      dialogVisible.value = true
    }
    const add = () => {
      request.post('/api/book/add', form).then(res => {
        if (res.code == "1") {
          ElMessage({
            type: 'success',
            message: '添加书籍成功',
          })
          load()
        } else {
          ElMessage({
            type: 'error',
            message: '添加书籍失败',
          })
        }
        form.value = {}
      })
      // 关闭弹窗
      dialogVisible.value = false
      // 刷新数据
      load()
    }

    // 取消按钮
    const cancel = () => {
      dialogVisible.value = false
    }

    //查询功能
    let keywords = ref('')
    const search = () => {
      request.get('/api/book/search/' + keywords.value).then(res => {
        if (res.code == '1') {
          ElMessage({
            type: 'success',
            message: '查询成功'
          })
          tableData.value = res.data
          console.log(tableData.value);
        } else {
          ElMessage({
            type: 'error',
            message: '查询失败'
          })
        }
      })
    }

    //删除功能
    const handleDetele = (id) => {
      request.get('/api/book/delete/' + id).then(res => {
        if (res.code == "1") {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          load()
        } else {
          ElMessage({
            type: 'error',
            message: '删除失败',
          })
        }
      })
    }

    // 编辑功能
    const handleEdit = (row) => {
      isUpdate.value = true
      form.id = row.id
      form.name = row.name
      form.cover = row.cover
      form.author = row.author
      form.press = row.press
      form.producer = row.producer
      form.price = row.price
      form.pagesNumber = row.pagesNumber
      form.isbn = row.isbn
      dialogVisible.value = true
    }

    const update = () => {
      request.post('/api/book/update', form).then(res => {
        if (res.code == '1') {
          ElMessage({
            message: '更新成功',
            type: 'success'
          })
          load()
        } else {
          ElMessage({
            message: '更新失败',
            type: 'error'
          })
        }
        dialogVisible.value = false
      })
    }

    //上传数据
    const dataUp = () => {
      //判断是 update还是 insert
      if (isUpdate.value) {
        update()
      } else {
        add()
      }
    }

    // 分页功能
    const handleCurrentChange = () => {

    }

    const handleSizeChange = () => { }


    return {
      load,
      tableData,
      total,
      pageSize,
      currentPage,
      handleDetele,
      create,
      form,
      dialogVisible,
      add,
      keywords,
      search,
      handleEdit,
      handleCurrentChange,
      handleSizeChange,
      cancel,
      update,
      dataUp
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

.tools {
  display: flex;
  flex-direction: row;
  margin: 10px 10px;
}

.el-menu-vertical-demo {
  width: 100px !important;
  height: 100vh !important;
}
</style>