import moment from 'moment'
import _ from 'lodash'
import { api } from '../../utils'

// export const actionSearch = (payload: any) => ({
//   type: Types.SEARCH,
//   payload
// })

const convertUndefined = (values: any) => {
  if (values === 'undefined') {
    return '00'
  }
  return values
}

export const actionGetOTSearch = (payload: any) => async () => {
  try {
    const res = await api.post('/ot/search', payload)
    const arr = await Promise.all(
      res.data.data.map(async (item: any) => ({
        date: moment(item.date).format('DD/MM/YYYY'),
        note: item.note ? item.note : '',
        time: `${item.from} ~ ${item.to}`,
        start: item.from,
        end: item.to,
        ship: item.ship,
        project: item.project,
        approved: item.approved,
        id: item._id,
      })),
    )
    return { status: 200, data: arr }
  } catch (error) {
    return error
  }
}
export const actionGetOnsiteSearch = (payload: any) => async () => {
  try {
    const res = await api.post('/onsite/search', payload)
    const arr = res.data.data.map((item: any) => ({
      date: moment(item.date).format('DD/MM/YYYY'),
      note: item.note ? item.note : '',
      project: item.project,
      approved: item.approved,
      timeWork: [_.get(item, 'from', '00:00'), _.get(item, 'to', '00:00')],
      displayTime: `${convertUndefined(item.from)} ~ ${convertUndefined(item.to)}`,
      id: item._id,
    }))
    return { status: 200, data: arr }
  } catch (error) {
    return error
  }
}
