import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import type { Room } from '~/api/@types'
import { Board } from '~/components/Board'
import { Sideber } from '~/components/Sideber'
import styles from './styles.module.css'

export type OptionalQuery = {
  roomId: number
}

export default defineComponent({
  setup() {
    const ctx = useContext()
    const route = useRoute()
    const rooms = ref<Room[]>()
    const roomId = computed(() => {
      const { roomId } = route.value.query
      return isNaN(+roomId) ? undefined : +roomId
    })
    console.log('roomID =', roomId.value)

    onMounted(async () => {
      rooms.value = await ctx.$api.rooms.$get()
    })

    return () =>
      rooms.value ? (
        <div class={styles.container}>
          <div class={styles.sideberwrapper}>
            {rooms.value && <Sideber rooms={rooms.value} />}
          </div>
          <div class={styles.boardwrapper}>
            {roomId.value !== undefined && (
              <Board cards={rooms.value[roomId.value].cards} />
            )}
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )
  },
})
