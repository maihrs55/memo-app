import { mockMethods } from 'aspida-mock'
import { rooms } from '~/api/@seeds'
import type { Room } from '~/api/@types'

export type Methods = {
  patch: {
    reqBody: Partial<Omit<Room, 'roomId'>>
  }
}

export default mockMethods<Methods>({
  patch: (params) => {
    const { roomId } = params.values
    if (typeof roomId === 'string') return { status: 400 }

    const resBody = Object.assign(
      rooms.find((room) => room.roomId === roomId),
      params.reqBody
    )
    return { status: 200, resBody }
  },
})
