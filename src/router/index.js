import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Quality_CreateProject from '@/views/Quality/Quality_CreateProject'
import Quality_Project from '@/views/Quality/Quality_Project'
import Quality_StandardList from '@/views/Quality/Quality_StandardList'
import Experiment_TaskExamine from '@/views/Experiment/Experiment_TaskExamine'
import Experiment_QueryTask from '@/views/Experiment/Experiment_QueryTask'
import Experiment_SubmitTask from '@/views/Experiment/Experiment_SubmitTask'
import Experiment_ResolveTask from '@/views/Experiment/Experiment_ResolveTask'
import Device_Management from '@/views/Device/Device_Management'
import LoginView from '@/views/Public/LoginView'
import SystemAdmin_DeviceManagement from '@/views/SystemAdmin/SystemAdmin_DeviceManagement'

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
  },

  {
    path: '/experiment/querytask/',
    name: 'queryTask',
    component: Experiment_QueryTask,
  },
  {
    path: '/experiment/taskexamine/',
    name: 'taskExamine',
    component: Experiment_TaskExamine,
  },
  {
    path: '/experiment/submittask/',
    name: 'submitTask',
    component: Experiment_SubmitTask,
  },
  {
    path: '/experiment/resolvetask/',
    name: 'resolveTask',
    component: Experiment_ResolveTask,
  },
  {
    path: '/device/management/',
    name: 'management',
    component: Device_Management,
  },
  {
    path: '/login/',
    name: 'loginView',
    component: LoginView,
  },
  {
    path: '/systemadmin/devicemanagement',
    name: 'devicemanagement',
    component: SystemAdmin_DeviceManagement,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
