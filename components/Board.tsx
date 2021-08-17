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
  },
  setup(props) {
    const onClick = () => props.add()
    const isClick = ref(false)
    const onMousedown = () => {
      isClick.value = true
    }
    const onMouseup = () => {
      isClick.value = false
    }
    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <div
            key={card.cardId}
            class={isClick.value ? styles.cardMoveArea : styles.cardFixedArea}
            onMousemove={onMousedown}
            onMouseup={onMouseup}
          >
            <StickyCard
              card={card}
              input={(text) => props.input(card.cardId, text)}
              delete={() => props.delete(card.cardId)}
              position={(position) => props.position(card.cardId, position)}
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
