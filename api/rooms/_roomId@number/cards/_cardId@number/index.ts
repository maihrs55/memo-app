import { mockMethods } from 'aspida-mock'
import { rooms } from '~/api/@seeds'
import type { Card } from '~/api/@types'

export type Methods = {
  patch: {
    reqBody: Partial<Omit<Card, 'cardId'>>
    resBody: Card
  }
}

export default mockMethods<Methods>({
  patch: (params) => {
    const { roomId, cardId } = params.values
    if (typeof roomId === 'string' || typeof cardId === 'string')
      return { status: 400 }

    const resBody = Object.assign(
      rooms
        .find((room) => room.roomId === roomId)
        ?.cards.find((card) => card.cardId === cardId),
      params.reqBody
    )

    return { status: 200, resBody }
  },
})
