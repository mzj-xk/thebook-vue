<template>
  manage
</template>

<script>

import request from '../utils/request'
export default {
  name: 'UserManage',
  setup () {
    // 获取数据
    const load = () => {
      request.get('/api/user/findAll', {
        params: {
          pageNum: 1,
        }
      }).then(() => {
        // tableData.value = res.data.records
        // total.value = res.data.total
      })
    }

    return {
      load
    }
  }
}
</script>