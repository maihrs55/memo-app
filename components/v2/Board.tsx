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
  },
  setup(props) {
    const cardIds = ref(props.cards.map((c) => c.cardId))
    const getCardById = (cardId: number) =>
      props.cards.filter((c) => c.cardId === cardId)[0]
    watch(
      () => props.cards,
      () => (cardIds.value = props.cards.map((c) => c.cardId))
    )
    const addCardIdToTail = (cardId: number) =>
      props.cards.filter((c) => c.cardId === cardId)[0]
    return () => (
      <div class={styles.boardContainer}>
        {cardIds.value.map((cardId) => (
          <div onMousedown={() => addCardIdToTail(cardId)}>
            <StickyCard
              card={getCardById(cardId)}
              delete={(cardId) => props.delete(cardId)}
            />
          </div>
        ))}
        <button class={styles.addCardButton}>+</button>
      </div>
    )
  },
})
