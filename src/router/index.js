import Vue from 'vue'
import Router from 'vue-router'
import persons from '@/components/PersonList'
import details from '@/components/PersonDetails'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PersonList',
      component: persons
    },
    {
      path: '/details',
      name: 'PersonDetails',
      component: details
    }
  ]
})
