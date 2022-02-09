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
    addCard: {
      type: Function as PropType<() => void>,
      required: true,
    },
    inputText: {
      type: Function as PropType<
        (cardId: Card['cardId'], text: string) => void
      >,
      required: true,
    },
    position: {
      type: Function as PropType<
        (cardId: Card['cardId'], position: { x: number; y: number }) => void
      >,
      required: true,
    },
  },
  setup(props) {
    const cardIds = ref(props.cards.map((c) => c.cardId))
    const getCardById = (cardId: number) =>
      props.cards.filter((c) => c.cardId === cardId)[0]
    watch(
      () => props.cards,
      () => (cardIds.value = props.cards.map((c) => c.cardId))
    )
    const addCardIdToTail = (id: number) => {
      cardIds.value = [...cardIds.value.filter((c) => c != id), id]
      props.updateOrder(cardIds.value)
    }
    // const getCardStyle = (id: number) => ({
    //   top: `${getCardById(id).position.y}px`,
    //   left: `${getCardById(id).position.x}px`,
    //   backgroundColor: getCardById(id).color,
    // })
    const deleteOrder = (clickCardId: number) => {
      cardIds.value = [...cardIds.value.filter((c) => c !== clickCardId)]
      props.delete(clickCardId)
      props.updateOrder(cardIds.value)
      cardIds.value = cardIds.value
    }
    const onClick = () => props.addCard()
    return () => (
      <div class={styles.boardContainer}>
        {cardIds.value.map((cardId) => (
          <div id={'card' + cardId} onMousedown={() => addCardIdToTail(cardId)}>
            <StickyCard
              // style={getCardStyle(cardId)}
              card={getCardById(cardId)}
              delete={(clickCardId) => deleteOrder(clickCardId)}
              input={(text) => props.inputText(cardId, text)}
              position={(position) => props.position(cardId, position)}
              cardIds={() => cardIds.value}
            />
          </div>
        ))}
        <button class={styles.addCardButton} onClick={onClick}>
          +
        </button>
      </div>
    )
  },
})
