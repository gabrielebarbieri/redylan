import Vue from 'vue'
import Router from 'vue-router'
import Generator from '@/components/SongGenerator'
import HowItWorks from '@/components/HowItWorks'
import Metrics from '@/components/Metrics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/automatic-generator/',
      name: 'Generator',
      component: Generator
    },
    {
      path: '/how-it-works/',
      name: 'HowItWorks',
      component: HowItWorks
    },
    {
      path: '/interactive-generator/',
      name: 'Metrics',
      component: Metrics
    },
    {
      path: '/',
      name: 'Home',
      component: Metrics
    }
  ]
})
