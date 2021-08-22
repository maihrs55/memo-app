import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import styles from '~/components/styles.module.css'
import { StickyCard } from './StickyCard'

export const CardContainer = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    input: {
      type: Function as PropType<(text: string) => void>,
      required: true,
    },
    delete: { type: Function as PropType<() => void>, required: true },
    position: {
      type: Function as PropType<(position: { x: number; y: number }) => void>,
      required: true,
    },
    zIndex: {
      type: Function as PropType<
        (cardId: Card['cardId'], zIndex: number) => void
      >,
      required: true,
    },
    maxzIndex: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props) {
    const maxzIndex = computed(() => props.maxzIndex)
    const isMoving = ref(false)
    const localcardStyles = ref({
      id: props.card.cardId,
      style: { height: '0%', width: '0%', zIndex: props.card.zIndex },
    })
    const displayCardStyles = computed(() => localcardStyles.value.style)
    const setCardStyles = (cardid: number, zIndex: number) =>
      (localcardStyles.value = {
        ...localcardStyles.value,
        id: cardid,
        style: {
          ...localcardStyles.value.style,
          height: '0%',
          width: '0%',
          zIndex: zIndex,
        },
      })
    const expandMoveArea = (cardid: number, zIndex: number) => ({
      ...localcardStyles.value,
      id: cardid,
      style: { height: '100%', width: '100%', zIndex: zIndex },
    })
    const shrinkMoveArea = (cardid: number, zIndex: number) => ({
      id: cardid,
      style: { height: '0%', width: '0%', zIndex: zIndex },
    })
    const onMousedown = (cardId: number, zIndex: number) => {
      const uzIndex = +maxzIndex.value + 1
      localcardStyles.value = expandMoveArea(cardId, uzIndex)
      isMoving.value = true
      props.zIndex(props.card.cardId, uzIndex)
    }
    const onMouseup = (cardid: number) => {
      const uzIndex = localcardStyles.value.style.zIndex
      localcardStyles.value = shrinkMoveArea(cardid, uzIndex)
      isMoving.value = false
    }
    return () => (
      <div
        class={styles.cardMoveArea}
        id={'card' + `${props.card.cardId}`}
        style={displayCardStyles.value}
        onMousedown={() => onMousedown(props.card.cardId, props.card.zIndex)}
        onMouseup={() => onMouseup(props.card.cardId)}
      >
        <StickyCard
          card={props.card}
          input={(text) => props.input(text)}
          delete={() => props.delete()}
          position={(position) => props.position(position)}
        />
      </div>
    )
  },
})
