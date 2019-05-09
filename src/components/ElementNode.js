import mergeWith from 'lodash/mergeWith'

import TextNode from './TextNode'

export default {
  functional: true,
  props: {
    tag: {
      required: true
    },
    tagAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    skipTag: {
      type: Boolean,
      default: false
    },
    selfClosable: {
      type: Boolean,
      default: true
    },
    skipIfEmpty: {
      type: Boolean,
      default: false
    },
    formatter: TextNode.props.formatter,
    formatterOptions: TextNode.props.formatterOptions
  },
  render(h, context) {
    let {
      tag,
      tagAttrs,
      skipTag,
      formatter,
      formatterOptions,
      selfClosable,
      skipIfEmpty
    } = context.props
    let slots = context.slots().default
    let text = ''
    let mergeAttributes = (accumulator, currentValue) => {
      return mergeWith(accumulator, currentValue, (value1, value2, key) => {
        if (key === 'class' && value1 && value2) {
          return `${value1} ${value2}`
        } else if (key === 'style' && value1 && value2) {
          return `${value1} ${value2}`
        } else if (typeof value2 !== 'undefined') {
          return value2
        } else {
          return value1
        }
      })
    }
    let allAttributes = [tagAttrs]
    let allStyles = []

    let { attrs, style, staticClass, staticStyle } = context.data
    if (attrs) {
      delete attrs.slot
      allAttributes.push(attrs)
    }
    if (staticClass) allAttributes.push({ class: staticClass })
    if (context.data.class) allAttributes.push({ class: context.data.class })
    if (staticStyle) allStyles.push(staticStyle)
    if (style) allStyles.push(style)
    if (slots) {
      allAttributes = allAttributes.concat(
        slots
          .filter(node => node.tag === 'ATTRIBUTE')
          .map(node => node.data.attrs)
      )

      text = slots.map(node => node.text).join(' ')
    }
    if (allStyles.length > 0) {
      let mergedStyles = allStyles.reduce(mergeAttributes, {})
      let styles = Object.entries(mergedStyles)
        .map(([key, value]) => {
          return `${key}: ${value};`
        })
        .join(' ')
      allAttributes.push({ style: styles })
    }

    let mergedAttributes = allAttributes.reduce(mergeAttributes, {})
    let attributes =
      Object.entries(mergedAttributes)
        .map(([key, value]) => {
          if (typeof value === 'undefined') {
            return key
          } else {
            return `${key}="${value}"`
          }
        })
        .join(' ') || ''

    if (attributes !== '') {
      attributes = ` ${attributes}`
    }
    let html
    if (skipTag) {
      html = text
    } else if (text === '' && skipIfEmpty) {
      return null
    } else if (text === '' && selfClosable) {
      html = `<${tag}${attributes} />\n`
    } else {
      html = `<${tag}${attributes}>
${text}
</${tag}>\n`
    }

    return h(TextNode, {
      props: { text: html, formatter, formatterOptions },
      on: context.listeners
    })
  }
}
