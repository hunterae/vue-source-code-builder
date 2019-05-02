<template>
  <prism language="html">
    <prism-root-element>
      <element-node tag="template" formatter="vue" @update="updateTemplate">
        <text-node>
          <slot/>
        </text-node>
      </element-node>
      <text-node :text="'\n\n'"></text-node>
      <element-node tag="script">
        <pre
          is="render-with-slot-hooks"
          tag="text-node"
          slot-name="script"
          :tag-data="{
            props: { formatter: 'babylon' },
            on: {
              update(event) {
                $emit('update:script', event)
              }
            }
          }"
        >
          export default {
          <render-with-slot-hooks slot-name="exports">
            data() {
              return {
                <render-with-slot-hooks slot-name="data"/>
              }
            },
            <render-with-slot-hooks slot-name="methods">
              <text-node slot="around_methods_content" slot-scope="content">
                methods: {
                  <component :is="content"/>
                },
              </text-node> 
            </render-with-slot-hooks>
          </render-with-slot-hooks>
          }
        </pre>
      </element-node>
      <text-node :text="'\n\n'" v-if="$slots.style"></text-node>
      <element-node tag="style" v-if="$slots.style">
        <pre
          is="render-with-slot-hooks"
          tag="text-node"
          slot-name="style"
          inner-slot-hooks-only
          :tag-data="{
            props: { formatter: 'css' },
            on: {
              update(event) {
                $emit('update:styles', event)
              }
            }
          }"
        />
      </element-node>
    </prism-root-element>
  </prism>
</template>

<script>
import 'prismjs'
import Prism from 'vue-prism-component'
import { RenderWithSlotHooks } from 'vue-slot-hooks'

// VuePrismComponent only uses the text of the first child element, so using a functional component to allow multiple
//  child elements
// TODO: Pull Request to https://github.com/egoist/vue-prism-component to use text from all children
let PrismRootElement = {
  functional: true,
  render(h, context) {
    return context.slots().default
  }
}

export default {
  components: {
    Prism,
    RenderWithSlotHooks,
    PrismRootElement
  },
  methods: {
    updateTemplate(event) {
      this.$emit(
        'update:template',
        event.replace(/^\s*<template>([\s\S]+)<\/template>\s*$/g, '$1')
      )
    }
  }
}
</script>

<style></style>
