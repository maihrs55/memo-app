import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import { StickyCard } from '~/components/v2/StickyCard'
import styles from '~/components/v2/styles.module.css'

export const Board = defineComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
    delete: {
      type: Function as PropType<(cardId: Card['cardId']) => void>,
      required: true,
    },
    updateOrder: {
      type: Function as PropType<(cardIds: number[]) => void>,
      required: true,
    },
    deleteOrder: {
      type: Function as PropType<(cardIds: number[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const updatecardIds = ref(props.cards.map((c) => c.cardId))
    const deleteCardIds = ref(props.cards.map((c) => c.cardId))
    const getCardById = (cardId: number) =>
      props.cards.filter((c) => c.cardId === cardId)[0]
    watch(
      () => props.cards,
      () => (updatecardIds.value = props.cards.map((c) => c.cardId))
    )
    const addCardIdToTail = (id: number) => {
      updatecardIds.value = [...updatecardIds.value.filter((c) => c != id), id]
      props.updateOrder(updatecardIds.value)
    }
    const getCardStyle = (id: number) => ({
      top: `${getCardById(id).position.y}px`,
      left: `${getCardById(id).position.x}px`,
      backgroundColor: getCardById(id).color,
    })
    const deleteOrder = (clickCardId: number) => {
      deleteCardIds.value = [
        ...deleteCardIds.value.filter((c) => c !== clickCardId),
      ]
      props.delete(clickCardId)
      props.deleteOrder(deleteCardIds.value)
      updatecardIds.value = deleteCardIds.value
    }
    return () => (
      <div class={styles.boardContainer}>
        {updatecardIds.value.map((cardId) => (
          <div onMousedown={() => addCardIdToTail(cardId)}>
            <StickyCard
              style={getCardStyle(cardId)}
              card={getCardById(cardId)}
              delete={(clickCardId) => deleteOrder(clickCardId)}
            />
          </div>
        ))}
        <button class={styles.addCardButton}>+</button>
      </div>
    )
  },
})
