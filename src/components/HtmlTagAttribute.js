export default {
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    value: {}
  },
  render(h, { props, _v }) {
    let { name, value } = props
    // if (typeof value !== 'undefined') {
    //   name = `${name}="${value}"`
    // }
    // return _v(`ATTRIBUTE:${name}`)
    return h('ATTRIBUTE', { attrs: { [name]: value } })
  }
}
