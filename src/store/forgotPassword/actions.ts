import { api } from '../../utils'

export const actionForgotPassword = (payload: any) => async () => {
  try {
    const res:any = await api.post('/send-email', payload)
    return res.data
  } catch (error) {
    return { message: 'Something wrong!' }
  }
}

export const actionCheckToken = (payload: any) => async () => {
  try {
    const res:any = await api.post('/check-token-expired', { token: payload })
    return res.data
  } catch (error) {
    return { message: 'Something wrong!' }
  }
}

export const actionResetPassword = (payload: any) => async () => {
  try {
    const res:any = await api.post('/forgot-password', payload)
    return res.data
  } catch (error) {
    return { message: 'Something wrong!' }
  }
}
