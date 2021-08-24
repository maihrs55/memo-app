import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import type { Card,Room } from '~/api/@types'
import {Board} from '~/components/v2/Board'
import { Sidebar } from '~/components/Sidebar'
import styles from '~/pages/v2/styles.module.css'

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

    onMounted(async () => {
      rooms.value = await ctx.$api.rooms.$get()
    })

    return () =>
      rooms.value ? (
        <div class={styles.container}>
          <div class={styles.sidebarwrapper}>
            {rooms.value && <Sidebar rooms={rooms.value} />}
          </div>
          <div class={styles.boardwrapper}></div>
        </div>
      ) : (
        <div> Loading... </div>
      )
  },
})
