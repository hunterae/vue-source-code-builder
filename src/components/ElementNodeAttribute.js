export default {
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    value: {}
  },
  render(h, { props }) {
    let { name, value } = props
    if (name === 'slot') {
      name = `slot='${value}'`
      value = undefined
    }

    return h('ATTRIBUTE', { attrs: { [name]: value } })
  }
}
