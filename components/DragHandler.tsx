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
    const onDragstart = (target: Event) => {
      if (!(target instanceof DragEvent)) return

      cursor.x = target.offsetX
      cursor.y = target.offsetY
      isDrag.value = true
    }
    const onDragend = () => {
      isDrag.value = false
    }

    const drag = (target: Event) => {
      if (!(target instanceof DragEvent)) return
      const px = isDrag.value ? +target.offsetX - cursor.x : 0
      const py = isDrag.value ? +target.offsetY - cursor.y : 0
      props.position({ x: px, y: py })
    }

    return () => (
      <div
        class={styles.stickyArea}
        is="dragHandler"
        onDrag={drag}
        onMouseup={onDragend}
        onDragstart={onDragstart}
      />
    )
  },
})
