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
    const cursor: { x: number; y: number } = { x: 0, y: 0 }
    const onMousedown = (_target: MouseEvent) => {
      isDrag.value = true
    }
    const onMouseup = (target: MouseEvent) => {
      isDrag.value = false
    }
    const onMousemove = (target: MouseEvent) => {
      const px = target.clientX - 240
      const py = target.clientY - 32 / 2
      props.position({ x: px, y: py })
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
