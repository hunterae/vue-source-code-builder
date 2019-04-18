import prettier from 'prettier/standalone'
import htmlParser from 'prettier/parser-html'
import babylonParser from 'prettier/parser-babylon'
import styleParser from 'prettier/parser-postcss'
import Prism from 'vue-prism-component'

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

    if (context.listeners && context.listeners['update:template']) {
      context.listeners['update:template'](htmlSource)
    }

    htmlSource = `<template> ${htmlSource} </template>`
    htmlSource = prettier.format(htmlSource, {
      jsxBracketSameLine: true,
      printWidth: printWidth,
      parser: 'vue',
      plugins: [htmlParser]
    })
    htmlSource = htmlSource.replace(/<\/(.*)\s+>/gm, '</$1>')

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
      plugins: [babylonParser]
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
      plugins: [styleParser]
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
