import { api } from '../../utils'
import { Types } from './types'

// action save data then login
export const actionSaveInfo = (payload: any) => ({
  type: Types.LOG_IN,
  payload,
})
// action log out
export const actionLogOut = () => ({
  type: Types.LOG_OUT,
})

export const actionChangePassword = (payload: any) => async () => {
  try {
    const res = await api.post('/change-password', payload)
    return res.data
  } catch (error) {
    return error
  }
}

// action login
export const actionLogin = (payload: any) => async () => {
  try {
    const response = await api.post('/login', payload)
    if (response.data.status === 200) {
      localStorage.setItem('token', response.data.data.access_token)
      return response.data
    }
    return response.data
  } catch (error) {
    return { message: 'Something wrong!' }
  }
}
