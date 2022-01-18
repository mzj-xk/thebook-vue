<template>
  <div class="container">
    <div class="form">
      <span class="title">欢迎使用TheBook后台管理系统</span>
      <div style="height:10px"></div>
      <div class="input">
        <input type="text"
               placeholder="请输入账号"
               v-model="form.username" />
      </div>
      <div style="height:10px"></div>
      <div class="input">
        <input type="password"
               placeholder="请输入密码"
               v-model="form.password" />
      </div>
      <div style="height:50px">
        <span v-if="tips"
              class="tips">账号或密码错误</span>
      </div>
      <button class="button"
              @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import request from '../utils/request'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  setup () {
    let form = reactive({
      username: '',
      password: ''
    })
    const router = useRouter()

    let tips = ref(false);

    (() => {
      if (sessionStorage.getItem('username') != null) {
        router.push('/home')
      }
    })()


    const login = () => {
      request.post("api/admin/login", form).then(res => {
        if (res.code == '1') {
          tips = true
          sessionStorage.setItem('username', res.data)
          router.push('/home')
        } else {
          tips.value = true
          sessionStorage.clear()
        }
      })
      form.username = ''
      form.password = ''
    }
    return {
      login,
      form,
      router,
      tips
    }
  }
}
</script>

<style scoped>
.container {
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  background: rgb(203, 210, 240);
}
.form {
  max-width: 400px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
}

.title {
  display: block;
  font-size: 20px;
  text-align: center;
  color: #626262;
}

.input {
  position: relative;
  display: flex;
  align-items: center;
}

.input input {
  padding: 16px 52px 16px 18px;
  border-radius: 48px;
  border: none;
  outline: none;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  font-size: 16px;
  color: #626262;
}
.button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  width: 80%;
  height: 10vh;
  border-radius: 48px;
  border: none;
  background: aquamarine;
  color: #626262;
}

.tips {
  padding: 10px 10px;
  display: block;
  text-align: center;
  color: red;
}
</style>