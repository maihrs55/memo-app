import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import styles from '~/components/styles.module.css'
import { DragHandler } from './DragHandler'

export const StickyCard = defineComponent({
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
    updateOrder: {
      type: Function as PropType<(cardId: Card['cardId']) => void>,
      required: true,
    },
  },
  setup(props) {
    const isForcusing = ref(false)
    const localtext = ref(props.card.text)
    const text = computed(() =>
      isForcusing.value ? localtext.value : props.card.text
    )
    const onInput = ({ target }: Event) => {
      if (!(target instanceof HTMLTextAreaElement)) return

      localtext.value = target.value
      props.input(target.value)
    }
    const onFocus = () => (isForcusing.value = true)
    const onBlur = () => (isForcusing.value = false)
    const onClick = () => props.delete()

    const isMoving = ref(false)
    const localPosition = ref(props.card.position)
    const containerPosition = computed(() =>
      localPosition.value === props.card.position
        ? props.card.position
        : localPosition.value
    )
    onmousedown = () => {
      isMoving.value = true
    }
    onmouseup = () => {
      isMoving.value = false
    }
    const onMousemove = (position: { x: number; y: number }) => {
      localPosition.value = isMoving.value
        ? { x: position.x, y: position.y }
        : localPosition.value

      props.position({ x: localPosition.value.x, y: localPosition.value.y })
    }

    return () => (
      <div
        class={styles.cardContainer}
        style={{
          top: `${containerPosition.value.y}px`,
          left: `${containerPosition.value.x}px`,
          backgroundColor: props.card.color,
        }}
      >
        {
          <DragHandler
            card={props.card}
            position={(p) => {
              onMousemove(p)
            }}
            onmousedown={onmousedown}
            onmouseup={onmouseup}
          />
        }
        <button class={styles.deleteButtom} type="button" onClick={onClick}>
          ×
        </button>
        <textarea
          style="border:none;"
          class={styles.textArea}
          value={text.value}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
        ></textarea>
      </div>
    )
  },
})
