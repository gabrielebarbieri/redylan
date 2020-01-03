import Vue from 'vue'
import Router from 'vue-router'
import Generator from '@/components/SongGenerator'
import HowItWorks from '@/components/HowItWorks'
import Metrics from '@/components/Metrics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Generator',
      component: Generator
    },
    {
      path: '/how-it-works/',
      name: 'HowItWorks',
      component: HowItWorks
    },
    {
      path: '/metrics/',
      name: 'Metrics',
      component: Metrics
    }
  ]
})
