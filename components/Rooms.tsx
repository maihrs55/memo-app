import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
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
    const ctx = useContext()

    return () => (
      <div class={styles.rooms}>
        {props.rooms.map((room) => (
          <nuxt-link
            key={room.roomId}
            to={ctx.$pagesPath.$url({ query: { roomId: room.roomId } })}
          >
            <div
              class={styles.room}
              key={room.roomId}
              style={{ color: room.color }}
            >
              {room.roomName}
            </div>
          </nuxt-link>
        ))}
      </div>
    )
  },
})
