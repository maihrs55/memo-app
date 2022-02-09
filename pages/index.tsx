import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import type { Card, Room } from '~/api/@types'
import { Board } from '~/components/Board'
import { Sidebar } from '~/components/Sidebar'
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

    onMounted(async () => {
      rooms.value = await ctx.$api.rooms.$get()
    })

    const updateCardText = async (cardId: Card['cardId'], text: string) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$patch({ body: { text } })

      rooms.value = await ctx.$api.rooms.$get()
    }

    const deleteCard = async (cardId: Card['cardId']) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return
      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$delete()

      rooms.value = await ctx.$api.rooms.$get()
    }

    const addCard = async () => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return
      await ctx.$api.rooms._roomId(validateRoomId).cards.$post()

      rooms.value = await ctx.$api.rooms.$get()
    }

    const updatePosition = async (
      cardId: Card['cardId'],
      position: { x: number; y: number }
    ) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$patch({ body: { position } })

      rooms.value = await ctx.$api.rooms.$get()
    }

    const updateOrder = async (order: number[]) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms._roomId(validateRoomId).order.$patch({ body: order })

      rooms.value = await ctx.$api.rooms.$get()
    }

    return () =>
      rooms.value ? (
        <div class={styles.container}>
          <div class={styles.sidebarwrapper}>
            {rooms.value && <Sidebar rooms={rooms.value} />}
          </div>
          <div class={styles.boardwrapper}>
            {roomId.value !== undefined && (
              <Board
                cards={rooms.value[roomId.value].cards}
                input={updateCardText}
                delete={deleteCard}
                add={addCard}
                position={updatePosition}
                updateOrder={updateOrder}
              />
            )}
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )
  },
})
