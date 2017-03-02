import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import CompanyDirectory from '@/components/CompanyDirectory'
import EnterInfo from '@/components/EnterInfo'
import CompanyInfo from '@/components/CompanyInfo'
import test from '@/components/test'
import backlog from '@/components/backlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
      {
      path: '/CompanyDirectory',
      name: 'CompanyDirectory',
      component: CompanyDirectory
    },
      {
      path: '/EnterInfo',
      name: 'EnterInfo',
      component: EnterInfo
    },
      {
      path: '/CompanyInfo',
      name: 'CompanyInfo',
      component: CompanyInfo
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/backlog',
      name: 'backlog',
      component: backlog
    }
  ]
})
