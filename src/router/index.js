import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Quality_CreateProject from '@/views/Quality/Quality_CreateProject'
import Quality_Project from '@/views/Quality/Quality_Project'
import Experiment_director1 from '@/views/Experiment/Experiment_director1'
import Experiment_director2 from '@/views/Experiment/Experiment_director2'


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
    path: '/experimentdepartment/director1/',
    name: 'director1',
    component: Experiment_director1,
  },
  {
    path: '/experimentdepartment/director2/',
    name: 'director2',
    component: Experiment_director2,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
