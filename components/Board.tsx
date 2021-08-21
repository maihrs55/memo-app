import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
} from '@nuxtjs/composition-api'
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
    // const cardStyle = ref({
    //   id: 0,
    //   style: { height: '0%', width: '0%', zIndex: 0 },
    // })
    const procCardStyles = (cardid: number, zIndex: number) => ({
      id: cardid,
      style: { height: '0%', width: '0%', zIndex: zIndex },
    })
    const localcardStyles = ref(
      props.cards.map((c) => procCardStyles(c.cardId, c.zIndex))
    )
    const displayCardStyles = computed(() =>
      localcardStyles.value.map((c) => procCardStyles(c.id, c.style.zIndex))
    )
    const maxzIndex = ref(Math.max(...props.cards.map((c) => c.zIndex)))
    const expandMoveArea = (cardid: number) => ({
      ...localcardStyles.value,
      id: cardid,
      style: { height: '100%', width: '100%', zIndex: maxzIndex.value + 1 },
    })
    const shrinkMoveArea = (cardid: number, zIndex: number) => ({
      ...localcardStyles.value,
      id: cardid,
      style: { height: '0%', width: '0%', zIndex: zIndex },
    })

    const getNewCardStyle = () => ({ ...localcardStyles.value })
    const cardLength = computed(() => props.cards.length)
    watch(cardLength, getNewCardStyle)

    const onMousedown = (cardId: number, zIndex: number) => {
      localcardStyles.value.find((s) => s.id === cardId) &&
        localcardStyles.value.push(procCardStyles(cardId, zIndex))
      console.log(localcardStyles.value)
      localcardStyles.value = localcardStyles.value.map((s) =>
        s.id === cardId
          ? expandMoveArea(s.id)
          : shrinkMoveArea(s.id, s.style.zIndex)
      )
      const card = localcardStyles.value.filter((s) => s.id === cardId)
      if (!card) return
      const localzIndex = card[0].style.zIndex
      props.zIndex(cardId, localzIndex)

      console.log(cardLength)
    }
    const onMouseup = () => {
      localcardStyles.value = localcardStyles.value.map((s) =>
        shrinkMoveArea(s.id, s.style.zIndex)
      )
    }
    const getStyles = (cardId: number, zIndex: number) => {
      return (
        localcardStyles.value.find((s) => s.id === cardId)?.style &&
        procCardStyles(cardId, zIndex).style
      )
    }

    return () => (
      <div class={styles.boardContainer}>
        {props.cards.map((card, i) => (
          <div
            key={card.cardId}
            class={styles.cardMoveArea}
            id={'card' + `${card.cardId}`}
            style={displayCardStyles.value.map((c) => c.style)}
            onMousedown={() => onMousedown(card.cardId, card.zIndex)}
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
