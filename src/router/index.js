import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Book from '../components/Book.vue'
import User from '../components/User.vue'
import Admin from '../components/Admin.vue'
const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/book',
    children: [
      {
        path: 'book',
        name: 'Book',
        component: Book
      },
      {
        path: 'user',
        name: 'user',
        component: User
      },
      {
        path: 'admin',
        name: 'admin',
        component: Admin
      },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router