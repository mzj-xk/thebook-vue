<template>
  <div class="book_info">
    <div class="cover">
      <div class="demo-image__preview">
        <el-image style="width: 150px; height: 200px"
                  :src="url"
                  :preview-src-list="srcList"
                  :initial-index="1"
                  fit="cover">
        </el-image>
      </div>
      <button>change</button>
    </div>
    <div class="info">
      <span>ID:{{bookInfo.id?? 'null'}}</span>
      <span>书名:{{bookInfo.name?? 'null'}}</span>
      <span>作者:{{bookInfo.author?? 'null'}}</span>
      <span>出版社:{{bookInfo.press ?? 'null'}}</span>
      <span>出品方:{{bookInfo.producer?? 'null'}}</span>
      <span>页数:{{bookInfo.pagesNumber?? 'null'}}</span>
      <span>定价:{{bookInfo.price?? 'null'}}</span>
      <span>ISBN:{{bookInfo.isbn?? 'null'}}</span>
      <span>评分:{{bookInfo.score== 0? '暂无评分':bookInfo.score}}</span>
    </div>
  </div>
  <div class="switch">
    <el-switch v-model="isShort" /> {{isShort ? '短评' :'长评'}}
    <el-button type="primary"
               @click="dialogVisible = true">新增</el-button>
  </div>
  <div>
    <el-table :data="tableData"
              style="width:91vw; height:300px;"
              stripe>
      <el-table-column prop="username"
                       label="用户名" />
      <el-table-column prop="content"
                       label="内容"
                       width="400" />
      <el-table-column prop="time"
                       label="时间" />
      <el-table-column prop="score"
                       label="评分" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-popconfirm title="这是一段内容确定删除吗？"
                         @confirm="handleDetele(scope.row.commentaryId)">
            <template #reference>
              <el-button type="text"
                         size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button @click="detail(scope.row.id)"
                     type="text"
                     size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog v-model="dialogVisible"
                 width="30%">
        <el-form :model="form"
                 label-width="70px">
          <el-form-item label="书籍ID">
            <el-input v-model="form.bookId"
                      disabled="false"></el-input>
          </el-form-item>
          <el-form-item label="
                      用户ID">
            <el-input v-model="form.userId"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="评分">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="add">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import request from '../utils/request'
import { watch } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
export default {
  setup () {
    // 接收传过来的 book id
    let id = ''
    const route = useRoute()
    id = route.query.bookId


    // 封面图片
    let url = ref('')
    let srcList = ref([])
    // 破解豆瓣防盗链
    let crackUrl = 'https://images.weserv.nl/?url='
    // 定义获取数据的方法
    let bookId = '' // 请求型参
    let bookInfo = reactive({
      id: '',
      name: '',
      cover: '',
      author: '',
      press: '',
      producer: '',
      price: '',
      pagesNumber: '',
      isbn: '',
      score: ''
    })


    let tableData = ref([])
    let isShort = ref(true)
    const load = () => {
      request.get('/api/book/detail/', {
        params: {
          bookId: id
        }
      }).then(res => {
        if (res.code == "1") {
          bookInfo.id = res.data.bookInfo.id
          bookInfo.name = res.data.bookInfo.name
          bookInfo.cover = res.data.bookInfo.cover
          bookInfo.author = res.data.bookInfo.author
          bookInfo.press = res.data.bookInfo.press
          bookInfo.producer = res.data.bookInfo.producer
          bookInfo.price = res.data.bookInfo.price
          bookInfo.pagesNumber = res.data.bookInfo.pagesNumber
          bookInfo.isbn = res.data.bookInfo.isbn
          bookInfo.score = res.data.bookInfo.score

          if (bookInfo.cover != null) {
            url.value = crackUrl + bookInfo.cover.substring(8)
            srcList.value.push(crackUrl + bookInfo.cover.substring(8))
          }

          if (isShort.value) {
            tableData.value = res.data.bookShortCommentary.records
          } else {
            tableData.value = res.data.bookCommentary.records
          }
        }
      })
    }
    load()

    watch(isShort, () => {
      load()
    })

    // 删除评价
    const handleDetele = (id) => {
      if (isShort.value) {
        request.get('/api/book/deleteShortCommentary/' + id).then(res => {
          if (res.code == '1') {
            ElMessage({
              message: '删除成功',
              type: 'success'
            })
            load()
          } else {
            ElMessage({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      } else {
        request.get('/api/book/deleteCommentary/' + id).then(res => {
          if (res.code == '1') {
            ElMessage({
              message: '删除成功',
              type: 'success'
            })
            load()
          } else {
            ElMessage({
              message: '删除失败',
              type: 'error'
            })
          }
        })
      }
    }

    // 提交评论表单
    let form = reactive({
      bookId: id,
      userId: '',
      username: '',
      content: '',
      score: '',
    })
    let dialogVisible = ref(false)
    const add = () => {
      if (isShort.value) {
        request.post('/api/book/addShortCommentary', form).then(res => {
          if (res.code == '1') {
            ElMessage({
              message: '添加成功',
              type: 'success'
            })
            load()
          } else {
            ElMessage({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      } else {
        request.post('/api/book/addCommentary', form).then(res => {
          if (res.code == '1') {
            ElMessage({
              message: '添加成功',
              type: 'success'
            })
            load()
          } else {
            ElMessage({
              message: '添加失败',
              type: 'error'
            })
          }
        })
      }
      dialogVisible.value = false

      //清空表单
      form.userId = ''
      form.username = ''
      form.content = ''
      form.score = ''

    }


    // 封面图片

    return {
      id,
      bookId,
      bookInfo,
      load,
      url,
      srcList,
      tableData,
      isShort,
      handleDetele,
      add,
      dialogVisible,
      form,
    }
  }
}
</script>


<style scoped>
.book_info {
  display: flex;
  height: 40vh;
  justify-content: center;
}
.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}

.info {
  width: 400px;
  height: 200px;
  margin-top: 15px;
  margin-left: 50px;
}

.info span {
  display: block;
}

.switch {
  padding-left: 110px;
}
</style>