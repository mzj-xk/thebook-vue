<template>
  <Header />
  <div>
  </div>
  <router-view />
</template>

<script>
import { ref } from '@vue/reactivity'
import Header from '../components/Header.vue'
export default {
  name: 'Home',
  components: {
    Header,
  },
  setup () {
    let username = ref('')
    username = sessionStorage.getItem('username')
    return {
      username,
    }
  },
}
</script>

<style scoped>
</style>