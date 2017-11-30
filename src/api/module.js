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

export function moduleAdd(appId, moduleName) {
  return fetch({
    url: '/module/add',
    method: 'post',
    data: {
      appId,
      moduleName
    }
  })
}
