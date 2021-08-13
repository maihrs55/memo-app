import { mockMethods } from 'aspida-mock'

export type Room = {
  roomId: number
  roomName: string
  color: string
}

export type Methods = {
  get: {
    resBody: Room[]
  }
}

const rooms: Room[] = [
  { roomId: 0, roomName: 'room1', color: 'blue' },
  { roomId: 1, roomName: 'room2', color: 'green' },
  { roomId: 2, roomName: 'room3', color: 'purple' },
]

export default mockMethods<Methods>({
  get: () => ({ status: 200, resBody: rooms }),
})
