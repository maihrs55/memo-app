import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import styles from '~/components/styles.module.css'
import { StickyCard } from './StickyCard'

export const Board = defineComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
    input: {
      type: Function as PropType<
        (cardId: Card['cardId'], text: string) => void
      >,
      required: true,
    },
    delete: {
      type: Function as PropType<(cardId: Card['cardId']) => void>,
      required: true,
    },
    add: {
      type: Function as PropType<() => void>,
      required: true,
    },
    position: {
      type: Function as PropType<
        (cardId: Card['cardId'], position: { x: number; y: number }) => void
      >,
      required: true,
    },
    updateOrder: {
      type: Function as PropType<(cardIds: number[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const onClick = () => props.add()
    const cardIds = ref(props.cards.map((c) => c.cardId))
    watch(
      () => props.cards,
      () => (cardIds.value = props.cards.map((c) => c.cardId))
    )
    const addCardIdToTail = (id: number) => {
      cardIds.value = [...cardIds.value.filter((c) => c != id), id]
      props.updateOrder(cardIds.value)
    }
    const getCardById = (cardId: number) =>
      props.cards.filter((c) => c.cardId === cardId)[0]
    return () => (
      <div class={styles.boardContainer}>
        {cardIds.value.map((cardId) => (
          <div onMousedown={() => addCardIdToTail(cardId)}>
            <StickyCard
              card={getCardById(cardId)}
              input={(text) => props.input(cardId, text)}
              delete={() => props.delete(cardId)}
              position={(position) => props.position(cardId, position)}
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
