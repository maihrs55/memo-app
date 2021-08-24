import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Card } from '~/api/@types'
import styles from '~/components/v2/styles.module.css'

export const DragHandler = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
  },
  setup(props) {
    return () => <div class={styles.stickyArea}></div>
  },
})
