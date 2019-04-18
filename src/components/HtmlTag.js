import mergeWith from 'lodash/mergeWith'

export default {
  functional: true,
  props: {
    tag: {
      required: true
    },
    skipTag: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    let { tag, skipTag } = context.props
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
    let allAttributes = []
    let allStyles = []

    let { attrs, style, staticClass, staticStyle } = context.data
    if (attrs) allAttributes.push(attrs)
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

    let html
    if (skipTag) {
      html = text
    } else if (text === '') {
      html = `<${tag} ${attributes} />`
    } else {
      html = `<${tag} ${attributes}> ${text} </${tag}>`
    }

    return context._v(html)
  }
}
