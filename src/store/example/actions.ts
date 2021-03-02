import { Types } from './types'
import States from './states'

export const actionExample = (payload: States['example']) => ({
  type: Types.EXAMPLE,
  payload,
})
