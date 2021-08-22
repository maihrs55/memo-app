import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { Card } from '~/api/@types'
import styles from '~/components/styles.module.css'

export const DragHandler = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
    position: {
      type: Function as PropType<(position: { x: number; y: number }) => void>,
      required: true,
    },
  },
  setup(props) {
    const isDrag = ref(false)
    const position = ref({ x: 0, y: 0 })
    const onMousedown = (target: MouseEvent) => {
      position.value = {
        ...position.value,
        x: target.clientX - 240,
        y: target.clientY - 32 / 2,
      }
      props.position(position.value)
      isDrag.value = true
    }
    const onMouseup = (target: MouseEvent) => {
      isDrag.value = false
    }
    const onMousemove = (target: MouseEvent) => {
      position.value = {
        ...position.value,
        x: target.clientX - 240,
        y: target.clientY - 32 / 2,
      }
      props.position(position.value)
    }

    return () => (
      <div
        class={isDrag ? styles.stickyArea : styles.movingStickyArea}
        onMousemove={onMousemove}
        onMouseup={onMouseup}
        onMousedown={onMousedown}
      >
        <div class={isDrag.value && styles.cardMoveArea} />
      </div>
    )
  },
})
