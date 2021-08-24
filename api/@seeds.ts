import type { Room } from '~/api/@types'

export const rooms: Room[] = [
  {
    roomId: 0,
    roomName: 'roomA',
    color: '#f16e47',
    cards: [
      {
        cardId: 0,
        text: 'roomAカードA',
        color: '#d69f28',
        position: { x: 200, y: 100 },
      },
      {
        cardId: 1,
        text: 'roomAカードB',
        color: '#a2c94c',
        position: { x: 300, y: 120 },
      },
      {
        cardId: 2,
        text: 'roomAカードC',
        color: '#b145af',
        position: { x: 400, y: 240 },
      },
    ],
    order: [0, 1, 2],
  },
  {
    roomId: 1,
    roomName: 'roomB',
    color: '#e9447b',
    cards: [
      {
        cardId: 0,
        text: 'roomBカードA',
        color: '#a2c94c',
        position: { x: 400, y: 130 },
      },
    ],
    order: [0],
  },
  { roomId: 2, roomName: 'roomC', color: '#b145af', cards: [], order: [] },
]

export const colors: string[] = [
  '#b145af',
  '#e9447b',
  '#f16e47',
  '#d69f28',
  '#a2c94c',
]
