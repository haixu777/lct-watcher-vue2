import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will not redirct in the levelbar
* noDropdown : if `noDropdown:true` will not has submenu in the sidebar
* meta : `{ role: ['admin'] }`  will control the page role
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },

  {
    path: '/state',
    component: Layout,
    redirect: '/state',
    noDropdown: true,
    icon: 'eye',
    children: [{ path: 'index', name: '运行状态', component: _import('page/runningState'), meta: { role: ['admin'] }}]
  },
  {
    path: '/record',
    component: Layout,
    redirect: '/record',
    noDropdown: true,
    icon: 'record',
    children: [{ path: 'index', name: '故障记录', component: _import('page/faultRecord'), meta: { role: ['admin'] }}]
  },
  {
    path: '/strategy',
    component: Layout,
    redirect: '/strategy',
    noDropdown: true,
    icon: 'settings',
    children: [{ path: 'index', name: '巡查策略', component: _import('page/strategy'), meta: { role: ['admin'] }}]
  },
  /*
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
    ]
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] }}]
  },
  */
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
