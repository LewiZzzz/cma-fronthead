import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Quality_CreateProject from '@/views/Quality/Quality_CreateProject'
import Quality_Project from '@/views/Quality/Quality_Project'
import Quality_StandardList from '@/views/Quality/Quality_StandardList'

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
    path: '/qualitydepartment/standardlist',
    name: 'standardlist',
    component: Quality_StandardList,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
