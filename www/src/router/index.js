import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import CompanyDirectory from '@/components/CompanyDirectory'
import EnterInfo from '@/components/EnterInfo'
import ConfirmCompanyInfo from '@/components/ConfirmCompanyInfo'
import ServiceRequest from '@/components/ServiceRequest'
import backlog from '@/components/backlog'
import assigned from '@/components/assigned'
import job from '@/components/job'
import bluejobs from '@/components/Bluejobs'
import orangejobs from '@/components/Orangejobs'
import greenjobs from '@/components/Greenjobs'
import EditInfo from '@/components/EditInfo'



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
      path: '/ConfirmCompanyInfo',
      name: 'ConfirmCompanyInfo',
      component: ConfirmCompanyInfo
    },
    {
      path: '/ServiceRequest',
      name: 'ServiceRequest',
      component: ServiceRequest
    },
    {
      path: '/backlog',
      name: 'backlog',
      component: backlog
    },
    {
      path: '/assigned',
      name: 'assigned',
      component: assigned
    },
    {
      path: '/job',
      name: 'job',
      component: job
    },
    {
      path: '/bluejobs',
      name: 'bluejobs',
      component: bluejobs
    },
    {
      path: '/orangejobs',
      name: 'orangejobs',
      component: orangejobs
    },
    {
      path: '/greenjobs',
      name: 'greenjobs',
      component: greenjobs
    },
    {
      path: '/EditInfo',
      name: 'EditInfo',
      component: EditInfo
    },
  ]
})