import { defineComponent, PropType } from '@nuxtjs/composition-api'
import type { Room } from '~/api/rooms'
import styles from '~/components/styles.module.css'

export const Rooms = defineComponent({
  props: {
    rooms: {
      type: Array as PropType<Room[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class={styles.rooms}>
        {props.rooms.map((room) => (
          <div
            class={styles.room}
            key={room.roomId}
            style={{ color: room.color }}
          >
            {room.roomName}
          </div>
        ))}
      </div>
    )
  },
})
