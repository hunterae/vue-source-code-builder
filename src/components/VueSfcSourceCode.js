import prettier from 'prettier/standalone'
import htmlParser from 'prettier/parser-html'
import babylonParser from 'prettier/parser-babylon'
import styleParser from 'prettier/parser-postcss'
import 'prismjs'
import Prism from 'vue-prism-component'

const prettierPlugins = [htmlParser, babylonParser, styleParser]

var getChildrenTextContent = function(children) {
  return children
    .map(function(node) {
      return node.children ? getChildrenTextContent(node.children) : node.text
    })
    .join('')
}

export default {
  functional: true,
  components: {
    Prism
  },
  props: {
    printWidth: {
      type: Number,
      default: 50
    },
    semicolons: {
      type: Boolean,
      default: false
    },
    stylesFormat: {
      type: String,
      default: 'css'
    }
  },
  render(h, context) {
    let slots = context.slots()
    let htmlSource = slots.default
      .map(node => node.text)
      .join(' ')
      .replace(/\s+$/gm, '')
      .trim()

    let { printWidth, semicolons, stylesFormat } = context.props

    htmlSource = `<template> ${htmlSource} </template>`
    htmlSource = prettier.format(htmlSource, {
      jsxBracketSameLine: true,
      printWidth: printWidth,
      parser: 'vue',
      plugins: prettierPlugins
    })
    htmlSource = htmlSource.replace(/<\/(.*)\s+>/gm, '</$1>')

    if (context.listeners && context.listeners['update:template']) {
      context.listeners['update:template'](
        htmlSource.replace('<template>', '').replace('</template>', '')
      )
    }

    let jsSource = ''
    if (slots.script) {
      jsSource += getChildrenTextContent(slots.script)
    }
    // remove blank lines from the JS
    jsSource = jsSource.replace(/^\s*[\r\n]/gm, '')

    jsSource = prettier.format(jsSource, {
      semi: semicolons,
      printWidth: printWidth,
      parser: 'babylon',
      plugins: prettierPlugins
    })
    if (context.listeners && context.listeners['update:script']) {
      context.listeners['update:script'](jsSource)
    }

    let stylesSource = ''
    if (slots.styles) {
      stylesSource += getChildrenTextContent(slots.styles)
    }
    stylesSource = prettier.format(stylesSource, {
      printWidth: printWidth,
      parser: stylesFormat,
      plugins: prettierPlugins
    })

    let src =
      `${htmlSource}
<script>
${jsSource}</scrip` +
      `t>

<style>
${stylesSource}</style>`

    return h(Prism, src)
  }
}
