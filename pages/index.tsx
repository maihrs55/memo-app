import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import type { Room } from '~/api/rooms'
import type { User } from '~/api/users'
import { Rooms } from '~/components/Rooms'
import styles from './styles.module.css'

export default defineComponent({
  setup() {
    const ctx = useContext()
    const users = ref<User[]>()
    const rooms = ref<Room[]>()

    onMounted(async () => {
      users.value = (await ctx.$api.users.$get()).data
      rooms.value = await ctx.$api.rooms.$get()

      console.log(rooms.value)
    })

    return () => (
      <div class={styles.sampleFont}>
        {rooms.value && <Rooms rooms={rooms.value} />}
      </div>
    )
  },
})
