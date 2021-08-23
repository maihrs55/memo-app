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
    clickCardId: {
      type: Function as PropType<(cardId: Card['cardId']) => void>,
      required: true,
    },
    getzIndex: {
      type: Function as PropType<(zIndex: Card['zIndex']) => void>,
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

    const localPosition = ref(props.card.position)
    const containerPosition = computed(() =>
      localPosition.value === props.card.position
        ? props.card.position
        : localPosition.value
    )
    const setPosition = (
      position: { x: number; y: number },
      isDrag: Boolean
    ) => {
      localPosition.value = isDrag
        ? { x: position.x, y: position.y }
        : localPosition.value
      props.position({ x: localPosition.value.x, y: localPosition.value.y })
    }
    const maxzIndex = computed(() => props.getzIndex)
    const clickCardid = (cardId: number) => {
      props.clickCardId(cardId)
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
        <div onMousedown={() => clickCardid(props.card.cardId)}>
          <DragHandler
            card={props.card}
            position={(position, isDrag) => {
              setPosition(position, isDrag)
            }}
            maxzIndex={maxzIndex.value}
          />
        </div>
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
