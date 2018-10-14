import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import store from '../store'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mhome',
      component: home,
      children: [
        {
          path: 'article/:id',
          name: 'articleById',
          component : () => import('@/components/article/article'),
          meta : { title : '文章' }
        },
        {
          path: 'chart',
          component : () => import('@/components/chart/chart'),
        },
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
          path : 'user',
          component : () => import('@/components/user/user'),
          children: [
            {
              path : '',
              component : () => import('@/components/user/dongtai'),
              meta : { title: '个人中心', requireLogin: true },
            },
            {
              path: 'xihuan',
              component :  () => import('@/components/user/dongtai'),
              meta : { title: '个人中心', requireLogin: true },
            },
            {
              path: 'huida',
              component : () => import('@/components/user/huida'),
              meta : { title: '个人中心', requireLogin: true },
            },
            {
              path: 'wenzhang',
              component :  () => import('@/components/user/shangchuan'),
              meta : { title: '个人中心', requireLogin: true },
            },
            {
              path: 'my',
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





// const article = r => require.ensure([], () => r(require('@/components/article/article')), 'article')
// const chart = r => require.ensure([], () => r(require('@/components/chart/chart')), 'chart')
// const news = r => require.ensure([], () => r(require('@/components/home/news')), 'news')
// const css = r => require.ensure([], () => r(require('@/components/home/css')), 'css')
// const js = r => require.ensure([], () => r(require('@/components/home/js')), 'js')
// const discuss = r => require.ensure([], () => r(require('@/components/home/discuss')), 'discuss')
// const editor = r => require.ensure([], () => r(require('@/components/home/editor')), 'editor')




// const dongtai = r => require.ensure([], () => r(require('@/components/user/dongtai')), 'dongtai')
// const huida = r => require.ensure([], () => r(require('@/components/user/huida')), 'huida')
// const shangchuan = r => require.ensure([], () => r(require('@/components/user/shangchuan')), 'shangchuan')
// const my = r => require.ensure([], () => r(require('@/components/user/my')), 'my')







export default router