export type Card = {
  cardId: number
  text: string
  color: string
  position: {
    x: number
    y: number
  }
}

export type Room = {
  roomId: number
  roomName: string
  color: string
  cards: Card[]
}
