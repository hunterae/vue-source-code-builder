import prettier from 'prettier/standalone'
import htmlParser from 'prettier/parser-html'
import babylonParser from 'prettier/parser-babylon'
import styleParser from 'prettier/parser-postcss'

const prettierPlugins = [htmlParser, babylonParser, styleParser]

export default {
  functional: true,
  props: {
    text: String,
    curlyBraces: {
      type: Boolean,
      default: false
    },
    formatter: String,
    formatterOptions: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  render(h, context) {
    var getChildrenTextContent = function(children) {
      return children
        .map(function(node) {
          return node.children
            ? getChildrenTextContent(node.children)
            : node.text
        })
        .join('')
    }
    let { text, formatter, formatterOptions, curlyBraces } = context.props
    formatterOptions = {
      ...{
        jsxBracketSameLine: true,
        printWidth: 50,
        parser: formatter,
        plugins: prettierPlugins,
        semi: false
      },
      ...formatterOptions
    }

    let slots = context.slots()
    if (text && curlyBraces) {
      text = `{{ ${text} }} `
    } else if (slots && slots.default) {
      text = getChildrenTextContent(slots.default)
    }

    if (!text) {
      text = ''
    }

    if (formatter) {
      text = prettier.format(text, formatterOptions)
      text = text.replace(/\s+$/g, '').replace(/^\s*[\r\n]/gm, '')
    }

    if (context.listeners && context.listeners['update']) {
      context.listeners['update'](text)
    }

    return context._v(text)
  }
}
