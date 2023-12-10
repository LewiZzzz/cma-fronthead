import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Quality_CreateProject from '@/views/Quality/Quality_CreateProject'
import Quality_Project from '@/views/Quality/Quality_Project'

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
    path: '/qualitydepartment/project/',
    name: 'project',
    component: Quality_Project,
  },
  {

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
