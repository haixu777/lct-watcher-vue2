import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
    url: '/strategy/list',
    method: 'get',
    params
  })
}
