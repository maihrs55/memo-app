import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
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
      type: Function as PropType<(order: number[]) => void>,
      required: true,
    },
  },
  setup(props) {
    const onClick = () => props.add()
    const localCards = ref(props.cards)
    const order = ref([0, 1, 2])
    const addTargetCardTail = (cardId: number) => {
      localCards.value = {
        ...localCards.value.filter((c) => c.cardId === cardId),
      }
      order.value = [...localCards.value.map((c) => c.cardId)]
      props.updateOrder(order.value)
    }
    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <StickyCard
            card={card}
            input={(text) => props.input(card.cardId, text)}
            delete={() => props.delete(card.cardId)}
            position={(position) => props.position(card.cardId, position)}
            updateOrder={(cardId) => addTargetCardTail(cardId)}
          />
        ))}
        <button class={styles.addCardButton} onClick={onClick}>
          +
        </button>
      </div>
    )
  },
})
