import type { Room } from './@types'

export const rooms: Room[] = [
  {
    roomId: 0,
    roomName: 'room1',
    color: '#768EB7',
    order: [0, 1, 2],
    cards: [
      {
        cardId: 0,
        text: 'カード1',
        color: '#65A6E8',
        position: { x: 200, y: 100 },
        zIndex: 1,
      },
      {
        cardId: 1,
        text: 'カード2',
        color: '#4182CE',
        position: { x: 300, y: 120 },
        zIndex: 2,
      },
      {
        cardId: 2,
        text: 'カード3',
        color: '#2565B7',
        position: { x: 400, y: 240 },
        zIndex: 3,
      },
    ],
  },
  {
    roomId: 1,
    roomName: 'room2',
    color: '#B59599',
    order: [0],
    cards: [
      {
        cardId: 0,
        text: 'カード1',
        color: '#4182CE',
        position: { x: 400, y: 130 },
        zIndex: 1,
      },
    ],
  },
  { roomId: 2, roomName: 'room3', color: '#0F5076', order: [], cards: [] },
]

export const colors: string[] = [
  '#768EB7',
  '#65A6E8',
  '#768EB7',
  '#4182CE',
  '#2565B7',
  '#B59599',
]
