// rollup.config.js
import vue from 'rollup-plugin-vue'

import commonjs from 'rollup-plugin-commonjs'

// For setting the NODE Env to production
import replace from 'rollup-plugin-replace'

// Parsing of command line arguments - See https://devhints.io/minimist
import minimist from 'minimist'

// More efficient transpiling than Bable
import buble from 'rollup-plugin-buble'

// Ability to resolve imports that do not provide extensions
import resolve from 'rollup-plugin-node-resolve'

import { terser } from 'rollup-plugin-terser'

const argv = minimist(process.argv.slice(2))

const globals = {
  'vue-slot-hooks': 'VueSlotHooks',
  'vue-inherit-slots': 'VueInheritSlots',
  'vue-prism-component': 'Prism',
  'prettier/standalone': 'prettier',
  'prettier/parser-html': 'htmlParser',
  'prettier/parser-babylon': 'babylonParser',
  'prettier/parser-postcss': 'styleParser',
  'lodash/mergeWith': 'mergeWith',
  'lodash/omit': 'omit',
  vue: 'Vue'
}

let externals = ['vue']
let input

if (argv.format !== 'iife') {
  externals = externals.concat([
    'prettier/standalone',
    'prettier/parser-html',
    'prettier/parser-babylon',
    'prettier/parser-postcss',
    'lodash/mergeWith',
    'lodash/omit',
    'vue-prism-component',
    'prismjs',
    'vue-slot-hooks',
    'vue-inherit-slots'
  ])
  input = 'src/plugin.js'
} else {
  input = 'src/browser-plugin.js'
}

const config = {
  external: externals,
  input: input,
  output: {
    name: 'VueSourceCodeBuilder',
    exports: 'named',
    globals: globals
  },
  plugins: [
    resolve({
      main: true,
      extensions: ['.js', '.vue']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble({ objectAssign: 'Object.assign' })
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(terser())
}

export default config
