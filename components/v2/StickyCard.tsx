import { defineComponent, PropType, ref, watch } from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import { DragHandler } from '~/components/v2/DragHandler'
import styles from '~/components/v2/styles.module.css'

export const StickyCard = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    delete: {
      type: Function as PropType<(cardId: Card['cardId']) => void>,
      required: true,
    },
    input: {
      type: Function as PropType<(text: string) => void>,
      required: true,
    },
    position: {
      type: Function as PropType<(position: { x: number; y: number }) => void>,
      required: true,
    },
    cardIds: {
      type: Function as PropType<(cardIds: Card['cardId'][]) => void>,
      required: true,
    },
  },
  setup(props) {
    const onClick = (cardId: number) => {
      props.delete(cardId)
    }
    const localtext = ref(props.card.text)
    const onInput = ({ target }: Event) => {
      if (!(target instanceof HTMLTextAreaElement)) return

      localtext.value = target.value
      props.input(target.value)
    }
    const localPosition = ref(props.card.position)
    const setPosition = (
      position: { x: number; y: number },
      isDrag: Boolean
    ) => {
      localPosition.value = isDrag
        ? { x: position.x, y: position.y }
        : localPosition.value
      props.position({ x: localPosition.value.x, y: localPosition.value.y })
    }
    const getCardStyle = () => ({
      top: `${localPosition.value.y}px`,
      left: `${localPosition.value.x}px`,
      backgroundColor: props.card.color,
    })
    const cardIds = ref(props.cardIds)
    watch(
      () => cardIds.value,
      () => getCardStyle()
    )
    return () => (
      <div
        is={'card' + props.card.cardId}
        class={styles.cardContainer}
        style={getCardStyle()}
      >
        <DragHandler
          card={props.card}
          position={(position, isDrag) => {
            setPosition(position, isDrag)
          }}
        />
        <button
          class={styles.deleteButtom}
          type="button"
          onMousedown={() => onClick(props.card.cardId)}
        >
          ×
        </button>
        <textarea
          class={styles.textArea}
          value={localtext.value}
          onInput={onInput}
        ></textarea>
      </div>
    )
  },
})
