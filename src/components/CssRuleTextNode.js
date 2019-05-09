import ObjectEntryTextNode from './ObjectEntryTextNode'

export default {
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      required: true
    }
  },
  render(h, { props }) {
    return h(ObjectEntryTextNode, {
      props: { quoteName: false, suffix: ';', ...props }
    })
  }
}
