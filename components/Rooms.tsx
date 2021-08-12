import { defineComponent, PropType } from '@nuxtjs/composition-api'
import type { Room } from '~/api/rooms'

export const Rooms = defineComponent({
  props: {
    rooms: {
      type: Array as PropType<Room[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div>
        {props.rooms.map((room) => (
          <div key={room.roomId} style={{ color: room.color }}>
            {room.roomName}
          </div>
        ))}
      </div>
    )
  },
})
