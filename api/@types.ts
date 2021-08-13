export type Card = {
  cardId: number
  text: string
  color: string
}

export type Room = {
  roomId: number
  roomName: string
  color: string
  cards: Card[]
}
