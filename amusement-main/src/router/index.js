import { createRouter, createWebHashHistory } from 'vue-router'
import Users from '../views/Users.vue'
import About from '../views/About.vue'
import BookingForm from '../views/BookingForm.vue'

const routes = [
  {
    path: '/users',
    name: 'User',
    component: Users
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path:'/book',
    name: BookingForm,
    component: BookingForm
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
