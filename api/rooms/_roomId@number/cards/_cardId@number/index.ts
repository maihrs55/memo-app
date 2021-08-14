import { mockMethods } from 'aspida-mock'
import { rooms } from '~/api/@seeds'
import type { Card } from '~/api/@types'

export type Methods = {
  patch: {
    reqBody: Partial<Omit<Card, 'cardId'>>
    resBody: Card
  }
  delete: { resBody: Card }
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
  delete: (params) => {
    const { roomId, cardId } = params.values
    if (typeof roomId === 'string' || typeof cardId === 'string')
      return { status: 400 }

    const room = rooms.find((r) => r.roomId === roomId)
    const card = room?.cards.find((c) => c.cardId === cardId)

    if (!room || !card)
      return {
        status: 400,
      }
    room.cards = room.cards.filter((cs) => cs.cardId !== cardId)
    return { status: 200, resBody: card }
  },
})
