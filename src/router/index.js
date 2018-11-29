import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home/home'
import store from '../store'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
        path: '/about',
        component : () => import('@/components/about/about'),
        children : [
            {
                path : '',
                component : () => import('@/components/about/main'),
            }
        ]
    },
    {
      path: '/',
      component: () => import('@/components/home/home'),
      children: [
        {
          path: 'article/:id',
          name: 'articleById',
          component : () => import('@/components/article/article'),
          meta : { title : '文章' }
        },
        // {
        //   path: 'chart',
        //   component : () => import('@/components/chart/chart'),
        // },
        {
          path : '',
          name: 'one',
          component : () => import('@/components/home/news'),
        },
        {
          path : 'css',
          component : () => import('@/components/home/css'),
        },
        {
          path : 'js',
          component : () => import('@/components/home/js'),
        },
        {
          path : 'discuss',
          component : () => import('@/components/home/discuss'),
        },
        {
          path : 'editor',
          name: 'editor',
          component : () => import('@/components/home/editor'),
          meta : { title: '个人中心', requireLogin: true },
        },
        {
          path : 'user/:username',
          component : () => import('@/components/user/user'),
          children: [
            {
              path : '',
              name : 'user-dongtai',
              component : () => import('@/components/user/dongtai')
            },
            {
              path: 'xihuan',
              name : 'user-xihuan',
              component :  () => import('@/components/user/like')
            },
            {
              path: 'huida',
              name : 'user-huida',
              component : () => import('@/components/user/huida')
            },
            {
              path: 'wenzhang',
              name : 'user-wenzhang',
              component :  () => import('@/components/user/shangchuan')
            },
            {
              path: 'my',
              name : 'user-my',
              component :  () => import('@/components/user/my'),
              meta : { title: '个人中心', requireLogin: true },
            },
          ]
        }
      ]
    }
  ]
})

//路由守卫
router.beforeEach( (to, from ,next) => {
  var token = window.localStorage.getItem('token')
  if( !token){
    if( to.meta.requireLogin ){
      const userName = store.getters[ 'getUserName' ]
      console.log(userName)
      if( userName ){
        next()
      }else{
        next({
          name: 'one'
        })
        store.dispatch('show')
      }
    }else{
      next()
    }
  }else{
    next()
  }
})



export default router