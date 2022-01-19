<template>
  detailed
  {{id}}
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import request from '../utils/request'
export default {
  setup () {
    // 接收传过来的 book id
    let id = ref('1')
    const route = useRoute()
    id.value = route.query.bookId

    // 定义获取数据的方法
    const load = () => {
      request.get('/api/book/detail/' + id.value)
    }
    load()
    return {
      id,
      load
    }
  }
}
</script>