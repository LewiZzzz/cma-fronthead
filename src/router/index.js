import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Quality_CreateProject from '@/views/Quality/Quality_CreateProject'
import Quality_adada from '@/views/Quality/Quality_adada'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/qualitydepartment/createproject/',
    name: 'createProject',
    component: Quality_CreateProject,
  },
  {
    path: '/qualitydepartment/create/',
    name: 'create',
    component: Quality_adada,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
