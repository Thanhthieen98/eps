import { Dispatch } from 'react'
import { api } from '../../utils'
import { Types } from './types'

export const actionOT = () => ({
  type: Types.OT,
})
export const actionOnside = () => ({
  type: Types.ONSITE,
})
export const actionSaveAllProject = (payload: any) => ({
  type: Types.SAVE_PROJECTS,
  payload,
})

export const actionGetAllProject = () => async (dispatch : Dispatch<any>) => {
  try {
    const response = await api.get('/projects')
    const allProject = response.data.data.map((item: any) => ({ id: item._id, name: item.name }))
    dispatch(actionSaveAllProject(allProject))
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const actionMemberProject = (payload: any) => async () => {
  try {
    const { data } = await api.get(`/projects/${payload}/members`)
    return {
      status: 200,
      member: [...data.data.map((item: any) => ({ label: item.name, value: item._id }))],
    }
  } catch (error) {
    return error
  }
}

export const actionAddOT = (payload: any) => async () => {
  console.log('🚀 ~ file: actions.ts ~ line 41 ~ actionAddOT ~ payload', payload)
  try {
    const res = await api.post('/ot', payload)
    return res.data
  } catch (error) {
    return error
  }
}

export const actionEditOT = (payload: any) => async () => {
  try {
    const res = await api.put(`/ot/${payload.id}`, payload)
    return res.data
  } catch (error) {
    return error
  }
}

export const actionDeleteOT = (payload: any) => async () => {
  try {
    const res = await api.delete(`/ot/${payload}`)
    return res.data
  } catch (error) {
    return error
  }
}

export const actionAddOnsite = (payload: any) => async () => {
  try {
    const res = await api.post('/onsite', payload)
    return res.data
  } catch (error) {
    return error
  }
}

export const actionEditOnsite = (payload: any) => async () => {
  try {
    const res = await api.put(`/onsite/${payload.id}`, payload)
    return res.data
  } catch (error) {
    return error
  }
}

export const actionDeleteOnsite = (payload: any) => async () => {
  try {
    const res = await api.delete(`/onsite/${payload}`)
    return res.data
  } catch (error) {
    return error
  }
}
