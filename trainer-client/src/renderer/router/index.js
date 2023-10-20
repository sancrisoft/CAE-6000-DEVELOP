import Vue from 'vue'
import Router from 'vue-router'
import trainer from '@/components/trainer/trainer-layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'trainer-layout',
      component: trainer
    }
  ]
})
