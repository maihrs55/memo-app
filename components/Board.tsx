import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import styles from '~/components/styles.module.css'

export const Board = defineComponent({
  props: {
    cards: {
      type: Array as PropType<Card[]>,
      required: true,
    },
  },
  setup(props) {
    const ctx = useContext()

    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <div key={card.cardId} style={{ color: card.color }}>
            {card.text}
          </div>
        ))}
      </div>
    )
  },
})
