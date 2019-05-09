import TextNode from './TextNode'
import ObjectTextNode from './ObjectTextNode'

export default {
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    quoteName: {
      type: Boolean,
      default: true
    },
    value: {
      required: true
    },
    quoteValue: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: String,
      default: ','
    }
  },
  render(h, context) {
    let { name, value, quoteValue, suffix, quoteName } = context.props
    let text = name
    if (name.indexOf('(') === -1) {
      if (quoteName) {
        text = `"${text}"`
      }
      text = `${text}:`
    }

    if (typeof value === 'object' && value !== null) {
      return [
        h(TextNode, {
          props: { text }
        }),
        h(ObjectTextNode, context.slots().default),
        h(TextNode, suffix)
      ]
    } else {
      if (quoteValue) {
        value = `"${value}"`
      }
      text = `${text} ${value}${suffix}`
      return h(TextNode, {
        props: { text: text }
      })
    }
  }
}
