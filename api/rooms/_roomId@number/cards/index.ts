import { mockMethods } from 'aspida-mock'
import { colors, rooms } from '~/api/@seeds'
import type { Card } from '~/api/@types'

export type Methods = {
  post: {
    resBody: Card
  }
}

export default mockMethods<Methods>({
  post: (params) => {
    const { roomId, cardId } = params.values
    if (typeof roomId === 'string' || typeof cardId === 'string')
      return { status: 400 }

    const rcardId = +`${Math.random()}`.slice(2)
    const rcolor = colors[Math.floor(Math.random() * colors.length)]

    const card: Card = {
      cardId: rcardId,
      text: '',
      color: rcolor,
      position: {
        x: 0,
        y: 0,
      },
    }

    const room = rooms.find((r) => r.roomId === roomId)

    if (!room || !card)
      return {
        status: 400,
      }

    room?.cards.push(card)
    return { status: 200, resBody: card }
  },
})
