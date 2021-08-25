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
        color: '#FFC39E',
        position: { x: 200, y: 100 },
      },
      {
        cardId: 1,
        text: 'roomAカードB',
        color: '#FFB7C5',
        position: { x: 300, y: 120 },
      },
      {
        cardId: 2,
        text: 'roomAカードC',
        color: '#FFB6E0',
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
        color: '#D4B9E8',
        position: { x: 400, y: 130 },
      },
    ],
    order: [0],
  },
  { roomId: 2, roomName: 'roomC', color: '#b145af', cards: [], order: [] },
]

export const colors: string[] = [
  '#D4B9E8',
  '#FFB6E0',
  '#FFB7C5',
  '#FFDB7C',
  '#F9F871',
]
