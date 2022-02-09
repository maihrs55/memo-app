import { mockMethods } from 'aspida-mock'
import { rooms } from '~/api/@seeds'
import type { Card } from '~/api/@types'

export type Methods = {
  patch: {
    reqBody: Card['cardId'][]
    resBody: Card[]
  }
}

export default mockMethods<Methods>({
  patch: (params) => {
    const { roomId } = params.values
    const cardIds = params.reqBody
    if (typeof roomId === 'string') {
      return { status: 400 }
    }
    const room = rooms.find((room) => room.roomId === roomId)
    if (!room) return { status: 400 }
    const getCardById = (cardId: number) =>
      room.cards.filter((c) => c.cardId === cardId)[0]
    room.cards = cardIds.map((c) => getCardById(c))
    if (!room.cards) return { status: 400 }

    return { status: 200, resBody: room.cards }
  },
})
