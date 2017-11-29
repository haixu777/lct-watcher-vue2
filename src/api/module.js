import fetch from '@/utils/fetch'

export function moduleDel(id) {
  return fetch({
    url: '/module/del',
    method: 'post',
    data: {
      id
    }
  })
}
