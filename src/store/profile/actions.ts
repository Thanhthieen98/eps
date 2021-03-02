import api from '../../utils/api'

export const actionGetProfile = (payload: any) => async () => {
  try {
    const res: any = await api.get(`/employees/detail/${payload}`)
    return res.data
  } catch (error) {
    return null
  }
}

export const actionSaveProfile = (payload: any) => async () => {
  try {
    const res: any = await api.post('/employees/update', payload)
    return res.data
  } catch (error) {
    return null
  }
}
export const actionSaveBankInfo = (payload: any) => async () => {
  try {
    const res: any = await api.post('/employees/banks', payload)
    return res.data
  } catch (error) {
    return null
  }
}
export const actionUpdateBankInfo = (payload: any) => async () => {
  try {
    const res: any = await api.patch('/employees/banks', payload)
    return res.data
  } catch (error) {
    return null
  }
}
