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

export function addMetric(formMetric) {
  let appId = formMetric.app,
      moduleId = formMetric.module,
      metric = formMetric.metric,
      endPoint = formMetric.endPoint,
      func = formMetric.func,
      operator = formMetric.operator,
      rightValue = formMetric.rightValue,
      maxStep = formMetric.maxStep,
      step = formMetric.step,
      note = formMetric.note,
      email = formMetric.email,
      dataType = formMetric.dataType,
      range = formMetric.range
  return fetch({
    url: '/strategy/add',
    method: 'post',
    data: {
      appId,
      moduleId,
      metric,
      endPoint,
      func,
      operator,
      rightValue,
      maxStep,
      step,
      note,
      email,
      dataType,
      range
    }
  })
}

export function editMetric(formMetric) {
  let id = formMetric.id,
      func = formMetric.func,
      operator = formMetric.operator,
      rightValue = formMetric.rightValue,
      maxStep = formMetric.maxStep,
      step = formMetric.step,
      note = formMetric.note,
      email = formMetric.email,
      dataType = formMetric.dataType
  return fetch({
    url: '/strategy/update',
    method: 'post',
    data: {
      id,
      func,
      operator,
      rightValue,
      maxStep,
      step,
      note,
      email,
      dataType
    }
  })
}
