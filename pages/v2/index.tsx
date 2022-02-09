import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import type { Card, Room } from '~/api/@types'
import { Board } from '~/components/v2/Board'
import { Sidebar } from '~/components/v2/Sidebar'
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
    watch(roomId, async () => {
      rooms.value = await ctx.$api.rooms.$get()
    })
    const deleteCard = async (cardId: Card['cardId']) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return
      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$delete()

      rooms.value = await ctx.$api.rooms.$get()
    }
    const updateOrder = async (cardIds: Card['cardId'][]) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .order.$patch({ body: cardIds })
      rooms.value = await ctx.$api.rooms.$get()
    }
    const updateCardText = async (cardId: Card['cardId'], text: string) => {
      const validateRoomId = roomId.value
      if (validateRoomId === undefined) return

      await ctx.$api.rooms
        ._roomId(validateRoomId)
        .cards._cardId(cardId)
        .$patch({ body: { text } })
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
                delete={deleteCard}
                updateOrder={updateOrder}
                addCard={addCard}
                inputText={updateCardText}
                position={updatePosition}
              />
            )}
          </div>
        </div>
      ) : (
        <div> Loading... </div>
      )
  },
})
