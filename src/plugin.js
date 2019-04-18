import HtmlTag from './components/HtmlTag'
import HtmlTagAttribute from './components/HtmlTagAttribute'
import TextElement from './components/TextElement'
import VueSfcSourceCode from './components/VueSfcSourceCode'

const VueSourceCodeBuilderPlugin = {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options = {}) {
    // TODO: allow options to be specified for global settings
    Vue.component('HtmlTag', HtmlTag)
    Vue.component('HtmlTagAttribute', HtmlTagAttribute)
    Vue.component('TextElement', TextElement)
    Vue.component('VueSfcSourceCode', VueSfcSourceCode)
  }
}

export default VueSourceCodeBuilderPlugin

export { HtmlTag, HtmlTagAttribute, TextElement, VueSfcSourceCode }

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueSourceCodeBuilderPlugin)
}
