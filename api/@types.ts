export type Card = {
  cardId: number
  text: string
  color: string
  position: {
    x: number
    y: number
  }
  zIndex: number
}

export type Room = {
  roomId: number
  roomName: string
  color: string
  order: number[]
  cards: Card[]
}

export type Color = { color: string }
