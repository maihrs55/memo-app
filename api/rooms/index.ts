import { mockMethods } from 'aspida-mock'
import { rooms } from '../@seeds'
import type { Room } from '../@types'

export type Methods = {
  get: {
    resBody: Room[]
  }
}

export default mockMethods<Methods>({
  get: () => ({ status: 200, resBody: rooms }),
})
