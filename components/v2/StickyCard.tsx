import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
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
  },
  setup(props) {
    const localPosition = ref(props.card.position)
    const containerPosition = computed(() => props.card.position)
    const cardContainerStyle = ref({
      top: `${containerPosition.value.y}px`,
      left: `${containerPosition.value.x}px`,
      backgroundColor: props.card.color,
    })
    const onClick = (cardId: number) => {
      props.delete(cardId)
    }

    return () => (
      <div class={styles.cardContainer}>
        <DragHandler card={props.card} />
        <button
          class={styles.deleteButtom}
          type="button"
          onMousedown={() => onClick(props.card.cardId)}
        >
          ×
        </button>
        <textarea class={styles.textArea}></textarea>
      </div>
    )
  },
})
