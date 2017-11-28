import fetch from '@/utils/fetch'

export function getList(params) {
  return fetch({
    url: '/strategy/list',
    method: 'get',
    params
  })
}

export function handleDelToServer(id) {
  return fetch({
    url: '/strategy/del',
    method: 'post',
    data: {
      id
    }
  })
}
