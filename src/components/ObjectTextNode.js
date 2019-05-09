import TextNode from './TextNode'

export default {
  functional: true,
  props: {
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    let { prefix, suffix } = context.props
    return [
      h(TextNode, {
        props: { text: `${prefix} {` }
      }),
      context.slots().default,
      h(TextNode, {
        props: { text: `}${suffix}` }
      })
    ]
  }
}
