import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import { StickyCard } from '~/components/v2/StickyCard'
import styles from '~/components/v2/styles.module.css'

export const Board = defineComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
  },
  setup(props) {
    const cardIds = ref(props.cards.map((c) => c.cardId))
    const getCardById = (cardId: number) =>
      props.cards.filter((c) => c.cardId === cardId)[0]
    return () => (
      <div class={styles.boardContainer}>
        {cardIds.value.map((cardId) => (
          <StickyCard card={getCardById(cardId)} />
        ))}
        <button class={styles.addCardButton}>+</button>
      </div>
    )
  },
})
