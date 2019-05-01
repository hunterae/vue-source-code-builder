import ElementNode from './components/ElementNode'
import ElementNodeAttribute from './components/ElementNodeAttribute'
import TextNode from './components/TextNode'
import VueSfcSourceCode from './components/VueSfcSourceCode'
import ViewOnCodepenButton from './components/ViewOnCodepenButton'

const VueSourceCodeBuilderPlugin = {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options = {}) {
    Vue.component('ElementNode', ElementNode)
    Vue.component('ElementNodeAttribute', ElementNodeAttribute)
    Vue.component('TextNode', TextNode)
    Vue.component('VueSfcSourceCode', VueSfcSourceCode)
    Vue.component('ViewOnCodepenButton', ViewOnCodepenButton)
  }
}

export default VueSourceCodeBuilderPlugin

export {
  ElementNode,
  ElementNodeAttribute,
  TextNode,
  VueSfcSourceCode,
  ViewOnCodepenButton
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueSourceCodeBuilderPlugin)
}
