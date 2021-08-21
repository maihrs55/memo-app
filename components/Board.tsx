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
    const cardStyle = ref({
      id: 0,
      style: { height: '0%', width: '0%', zIndex: 0 },
    })
    const procCardAtyles = (cardid: number, zIndex: number) => {
      return (cardStyle.value = {
        ...cardStyle.value,
        id: cardid,
        style: { height: '0%', width: '0%', zIndex: zIndex },
      })
    }
    const localcardStyles = ref(
      props.cards.map((c) => procCardAtyles(c.cardId, c.zIndex))
    )

    const maxzIndex = ref(Math.max(...props.cards.map((c) => c.zIndex)) + 1)
    const onMousedown = (cardId: number) => {
      if (!localcardStyles.value) return

      localcardStyles.value = localcardStyles.value.map((s) =>
        s.id === cardId
          ? {
              ...localcardStyles.value,
              id: s.id,
              style: { height: '100%', width: '100%', zIndex: maxzIndex.value },
            }
          : {
              ...localcardStyles.value,
              id: s.id,
              style: { height: '0%', width: '0%', zIndex: s.style.zIndex },
            }
      )
    }
    const onMouseup = () => {
      localcardStyles.value = localcardStyles.value.map((s) => ({
        ...localcardStyles.value,
        id: s.id,
        style: { height: '0%', width: '0%', zIndex: s.style.zIndex },
      }))
    }

    const getStyles = (cardId: number) => {
      return localcardStyles.value.find((s) => s.id === cardId)?.style
    }

    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card) => (
          <div
            key={card.cardId}
            class={styles.cardMoveArea}
            id={'card' + `${card.cardId}`}
            style={getStyles(card.cardId)}
            onMousedown={() => onMousedown(card.cardId)}
            onMouseup={onMouseup}
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
