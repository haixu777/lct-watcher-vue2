import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
    url: '/record/list',
    method: 'get',
    params
  })
}
