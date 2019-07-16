import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views/index').default
    }, {
      path: '/embedded',
      name: 'embedded',
      component: require('@/views/embedded').default
    }, {
      path: '/finish',
      name: 'finish',
      component: require('@/views/finish').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
