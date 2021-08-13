import { mockMethods } from 'aspida-mock'
import type { Room } from '../@types'

export type Methods = {
  get: {
    resBody: Room[]
  }
}

const rooms: Room[] = [
  { roomId: 0, roomName: 'room1', color: 'blue', cards: [] },
  { roomId: 1, roomName: 'room2', color: 'green', cards: [] },
  { roomId: 2, roomName: 'room3', color: 'purple', cards: [] },
]

export default mockMethods<Methods>({
  get: () => ({ status: 200, resBody: rooms }),
})
