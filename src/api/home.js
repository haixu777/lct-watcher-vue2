import fetch from '@/utils/fetch'

export function getAppStatus(params) {
  return fetch({
    url: '/home/currentStatus',
    method: 'get',
    params
  })
}

export function getAppModuleList(params) {
  return fetch({
    url: '/app/list',
    method: 'get',
    params
  })
}

export function getAppModuleTree(params) {
  return fetch({
    url: '/app/tree',
    method: 'get',
    params
  })
}
