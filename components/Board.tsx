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
    zIndex: {
      type: Function as PropType<
        (cardId: Card['cardId'], zIndex: number) => void
      >,
      required: true,
    },
  },
  setup(props) {
    const onClick = () => props.add()
    const isMoving = ref(false)
    const maxzIndex = ref(Math.max(...props.cards.map((item) => item.zIndex)))
    const cardStyle = ref({
      height: '0%',
      width: '0%',
      zIndex: 0,
    })
    const onMousedown = (cardId: number) => {
      isMoving.value = true
      // const c = props.cards.find((e)=>e.cardId===cardId)?.zIndex
      cardStyle.value = {
        height: '100%',
        width: '100%',
        zIndex: maxzIndex.value + 1,
      }
    }
    const onMouseup = (cardId: number) => {
      isMoving.value = false
      cardStyle.value = {
        height: '0%',
        width: '0%',
        zIndex: cardId,
      }
    }

    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <div
            key={card.cardId}
            class={styles.cardMoveArea}
            id={'card' + card.cardId + ''}
            onMousedown={() => onMousedown(card.cardId)}
            onMouseup={() => onMouseup(card.cardId)}
            style={cardStyle.value}
          >
            <StickyCard
              card={card}
              input={(text) => props.input(card.cardId, text)}
              delete={() => props.delete(card.cardId)}
              position={(position) => props.position(card.cardId, position)}
              zIndex={(zIndex) => props.zIndex(card.cardId, zIndex)}
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
