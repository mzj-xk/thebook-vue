import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Book from '../components/Book.vue'
import BookManage from '../components/BookManage.vue'
import BookDetail from '../components/BookDetail.vue'
import User from '../components/User.vue'
import Admin from '../components/Admin.vue'
import UserManage from '../components/UserManage.vue'
import UserReport from '../components/UserReport.vue'
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
    redirect: '/home/book/bookManage',
    children: [
      {
        path: 'book',
        name: 'Book',
        component: Book,
        redirect: '/home/book/bookManage',
        children: [
          { path: 'bookManage', name: 'bookManage', component: BookManage },
          { path: 'bookDetail', name: 'bookDetail', component: BookDetail }
        ]
      },
      {
        path: 'user',
        name: 'user',
        component: User,
        redirect: '/home/user/userManage',
        children: [
          { path: 'userManage', name: 'userManage', component: UserManage },
          { path: 'userReport', name: 'userReport', component: UserReport }
        ]
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