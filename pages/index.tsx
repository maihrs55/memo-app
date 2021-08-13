import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import type { Room } from '~/api/rooms'
import { Rooms } from '~/components/Rooms'
import styles from './styles.module.css'

export type OptionalQuery = {
  roomId: number
}

export default defineComponent({
  setup() {
    const ctx = useContext()
    const rooms = ref<Room[]>()

    onMounted(async () => {
      rooms.value = await ctx.$api.rooms.$get()
      console.log(rooms.value)
    })

    return () => (
      <div class={styles.roomswrapper}>
        {rooms.value && <Rooms rooms={rooms.value} />}
      </div>
    )
  },
})
