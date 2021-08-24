import { defineComponent, PropType } from '@nuxtjs/composition-api'
import type { Card } from '~/api/@types'
import styles from '~/components/v2/styles.module.css'

export const StickyCard = defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div
        class={styles.cardContainer}
        style={{
          top: '100px',
          left: '100px',
          backgroundColor: props.card.color,
        }}
      >
        <button class={styles.deleteButtom} type="button">
          ×
        </button>
        <textarea class={styles.textArea}></textarea>
      </div>
    )
  },
})
