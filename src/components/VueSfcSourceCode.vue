<template>
  <prism language="html">
    <text-node trim>
      <element-node
        tag="template"
        formatter="vue"
        :formatter-options="formatterOptions"
        @update="updateTemplate"
      >
        <text-node> <slot /> </text-node>
      </element-node>
      <text-node :text="'\n\n'"></text-node>
      <element-node tag="script" :self-closable="false">
        <render-with-slot-hooks
          tag="text-node"
          slot-name="script"
          :tag-data="{
            props: { formatter: 'babylon', formatterOptions },
            on: {
              update(event) {
                $emit('update:script', event)
              }
            }
          }"
        >
          <render-with-slot-hooks
            slot-name="exports"
            tag="object-text-node"
            :tag-data="{ props: { prefix: 'export default' } }"
          >
            <render-with-slot-hooks
              slot-name="data"
              tag="object-entry-text-node"
              :tag-data="{ props: { name: 'data()', value: {} } }"
            >
              <object-text-node
                prefix="return"
                suffix=";"
                slot="around_data_content"
                slot-scope="content"
              >
                <component :is="content" />
              </object-text-node>
            </render-with-slot-hooks>
            <render-with-slot-hooks
              slot-name="methods"
              tag="object-entry-text-node"
              :tag-data="{ props: { name: 'methods', value: {} } }"
            />
          </render-with-slot-hooks>
        </render-with-slot-hooks>
      </element-node>
      <text-node :text="'\n'"></text-node>
      <element-node tag="style" :self-closable="false" :skip-if-empty="true">
        <render-with-slot-hooks
          tag="text-node"
          slot-name="style"
          inner-slot-hooks-only
          :tag-data="{
            props: { formatter: 'css', formatterOptions },
            on: {
              update(event) {
                $emit('update:styles', event)
              }
            }
          }"
        />
      </element-node>
    </text-node>
  </prism>
</template>

<script>
import 'prismjs'
import Prism from 'vue-prism-component'
import { RenderWithSlotHooks } from 'vue-slot-hooks'

export default {
  components: {
    Prism,
    RenderWithSlotHooks
  },
  props: {
    formatterOptions: {
      type: Object,
      default() {
        return {}
      }
    }
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
