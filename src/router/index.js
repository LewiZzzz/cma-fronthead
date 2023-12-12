import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Quality_CreateProject from '@/views/Quality/Quality_CreateProject'
import Quality_Project from '@/views/Quality/Quality_Project'
<<<<<<< HEAD
import Quality_StandardList from '@/views/Quality/Quality_StandardList'
=======
import Experiment_director1 from '@/views/Experiment/Experiment_director1'
import Experiment_director2 from '@/views/Experiment/Experiment_director2'

>>>>>>> 8b4fe69dde631d554ab5ca4df5109bf43cc7aa92

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
<<<<<<< HEAD
    path: '/qualitydepartment/standardlist',
    name: 'standardlist',
    component: Quality_StandardList,
=======
    path: '/experimentdepartment/director1/',
    name: 'director1',
    component: Experiment_director1,
  },
  {
    path: '/experimentdepartment/director2/',
    name: 'director2',
    component: Experiment_director2,
>>>>>>> 8b4fe69dde631d554ab5ca4df5109bf43cc7aa92
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
