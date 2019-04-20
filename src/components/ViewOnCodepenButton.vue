<template>
  <form
    action="https://codepen.io/pen/define"
    method="POST"
    target="_blank"
    align="right"
    style="float:right"
  >
    <input type="hidden" name="data" :value="codepenData" />
    <button type="submit" class="btn btn-primary" title="Open on Codepen">
      View on Codepen
      <img
        src="http://s.cdpn.io/3/cp-arrow-right.svg"
        width="40"
        height="40"
        class="codepen-mover-button"
      />
    </button>
  </form>
</template>

<script>
export default {
  props: {
    jsCode: String,
    htmlCode: String,
    cssCode: String,
    cssDependencies: {
      type: Array,
      default() {
        return []
      }
    },
    jsDependencies: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    codepenData() {
      if (!this.jsCode) return null
      let jsCode = this.jsCode.replace(
        /export default \{([\s\S]*)\};?\s*$/gm,
        '$1}'
      )
      let js = `Vue.component('v-runtime-template', VRuntimeTemplate)
new Vue({
  el: "#app",
  template: "#source-template",${jsCode})`

      let html =
        `<div id="app"></div>

<script type="text/x-template" id="source-template">${this.htmlCode}
</scrip` + 't>'

      return JSON.stringify({
        html: html,
        js: js,
        css_external: this.cssDependencies.join(';'),
        js_external: this.jsDependencies.join(';')
      })
    }
  }
}
</script>

<style></style>
