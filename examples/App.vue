<template>
  <div id="app">
    <a
      href="https://github.com/hunterae/vue-source-code-builder"
      target="_blank"
    >
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"
        alt="Fork me on GitHub"
      />
    </a>
    <div class="jumbotron">
      <div class="container">
        <h1>vue-source-code-builder</h1>
        <p>Use Vue.js to generate Vue.js Source Code</p>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          This example shows the Vue code necessary to generate another Vue SFC
          file that itself can be run.
        </div>
        <div class="col-lg-4">
          <h3>Step 1: Set the options</h3>
          <hr />
          <h4>
            Choose options to configure what how and what source code will
            ultimately be generated
          </h4>
          <accordion>
            <accordion-section title="Output Options">
              <checkbox-input
                v-model="useSemicolons"
                label="Use Semicolons in formatted Javascript"
              />
              <select-input
                v-model.number="printWidth"
                label="Print Width"
                :options="[20, 30, 40, 50, 60, 70]"
              />
              <checkbox-input
                v-model="runGeneratedCode"
                label="Run the Generated Source Code?"
                help="Uses the external Vue plugin VRuntimeTemplate"
              />
            </accordion-section>
            <accordion-section title="Creating an HTML Tag">
              <select-input
                label="Applying the Html Tag"
                :options="['h1', 'h2', 'h3', 'h4', 'h5', 'h6']"
                v-model="tag"
                help="Applied as the 'tag' prop for the element-node component"
              />
              <checkbox-input
                v-model="applyElementNodeDynamically"
                label="Apply the tag dynamically"
              />
              <checkbox-input
                v-model="skipTagConditional"
                label="Apply a conditional to skip the tag and only render the content within?"
              />
              <checkbox-input
                v-model="skipTag"
                label="Condition True?"
                v-if="skipTagConditional"
              />
            </accordion-section>
            <accordion-section title="Applying CSS Classes">
              <p>
                <i>The following options apply CSS classes to the element</i>
              </p>
              <checkbox-input
                v-model="classInlineStatic"
                label="As an static attribute on the element-node"
              />
              <checkbox-input
                v-model="classInlineDynamic"
                label="As an dynamic attribute on the element-node"
              />
              <checkbox-input
                v-model="classAttributeStatic"
                label="As a separate element-node-attribute element with a static value"
              />
              <checkbox-input
                v-model="classAttributeDynamic"
                label="As a separate element-node-attribute element with a dynamic value"
              />
            </accordion-section>
            <accordion-section title="Apply CSS Styles">
              <p>
                <i>The following options apply CSS styles to the element</i>
              </p>
              <checkbox-input
                v-model="styleInlineStatic"
                label="As an static attribute on the element-node"
              />
              <checkbox-input
                v-model="styleInlineDynamic"
                label="As an dynamic attribute on the element-node"
              />
              <checkbox-input
                v-model="styleAttributeStatic"
                label="As a separate element-node-attribute element with a static value"
              />
              <checkbox-input
                v-model="styleAttributeDynamic"
                label="As a separate element-node-attribute element with a dynamic value"
              />
            </accordion-section>
            <accordion-section title="Apply Conditions">
              <checkbox-input
                v-model="applyConditionToAttribute"
                label="Apply a v-if condition to all element-node-attribute elements"
              />
              <checkbox-input
                v-model="elementNodeAttributesActive"
                label="Condition True?"
                v-if="applyConditionToAttribute"
              />
            </accordion-section>
          </accordion>
        </div>
        <div class="col-lg-4">
          <h3>Step 2: View the Code</h3>
          <hr />
          <section id="js">
            <h4>
              Here's the Vue SFC code which both generates formatted Vue SFC
              code and runs the generated code:
            </h4>
            <vue-sfc-source-code
              @update:template="htmlSourceCode = $event"
              @update:script="jsCode = $event"
              :formatter-options="formatterOptions"
            >
              <element-node tag="div">
                <element-node tag="vue-sfc-source-code">
                  <element-node-attribute
                    name="@update:template"
                    value="setRunnableCode"
                    v-if="runGeneratedCode"
                  />
                  <element-node-attribute
                    name=":formatter-options"
                    value="formatterOptions"
                  />
                  <element-node-attribute
                    name="@update:styles"
                    value="setStyleCode"
                  />
                  <element-node tag="element-node">
                    <element-node-attribute name="tag" value="div" />

                    <element-node tag="element-node">
                      <element-node-attribute
                        name=":tag"
                        value="tag"
                        v-if="applyElementNodeDynamically"
                      />
                      <element-node-attribute name="tag" :value="tag" v-else />
                      <element-node-attribute
                        name=":skip-tag"
                        value="skipTag"
                        v-if="skipTagConditional"
                      />
                      <element-node-attribute
                        name=":class"
                        value="dynamicInlineClass"
                        v-if="classInlineDynamic"
                      />
                      <element-node-attribute
                        name="class"
                        value="text-underlined"
                        v-if="classInlineStatic"
                      />
                      <element-node
                        tag="element-node-attribute"
                        name=":class"
                        value="cssClass"
                        v-if="classAttributeDynamic"
                      >
                        <element-node-attribute
                          name="v-if"
                          value="elementNodeAttributesActive"
                          v-if="applyConditionToAttribute"
                        />
                      </element-node>
                      <element-node
                        tag="element-node-attribute"
                        name="class"
                        value="text-red"
                        v-if="classAttributeStatic"
                      >
                        <element-node-attribute
                          name="v-if"
                          value="elementNodeAttributesActive"
                          v-if="applyConditionToAttribute"
                        />
                      </element-node>
                      <element-node-attribute
                        name=":style"
                        value="{ 'font-style': 'italic' }"
                        v-if="styleInlineDynamic"
                      />
                      <element-node-attribute
                        name="style"
                        value="background-color: green"
                        v-if="styleInlineStatic"
                      />
                      <element-node
                        tag="element-node-attribute"
                        name=":style"
                        value="{ textAlign: 'center' }"
                        v-if="styleAttributeDynamic"
                      >
                        <element-node-attribute
                          name="v-if"
                          value="elementNodeAttributesActive"
                          v-if="applyConditionToAttribute"
                        />
                      </element-node>
                      <element-node
                        tag="element-node-attribute"
                        name="style"
                        value="text-transform: uppercase;"
                        v-if="styleAttributeStatic"
                      >
                        <element-node-attribute
                          name="v-if"
                          value="elementNodeAttributesActive"
                          v-if="applyConditionToAttribute"
                        />
                      </element-node>
                      <element-node
                        tag="text-node"
                        text="Output of Running Source Code"
                      />
                    </element-node>
                  </element-node>
                  <element-node
                    tag="template"
                    :tag-attrs="{ slot: 'append_style_content' }"
                    v-if="classAttributeStatic"
                  >
                    <element-node tag="object-text-node" prefix=".text-red">
                      <element-node
                        tag="css-rule-text-node"
                        name="color"
                        value="red"
                      />
                    </element-node>
                  </element-node>
                  <element-node
                    tag="template"
                    :tag-attrs="{ slot: 'append_style_content' }"
                    v-if="classInlineStatic"
                  >
                    <element-node
                      tag="object-text-node"
                      prefix=".text-underlined"
                    >
                      <element-node
                        tag="css-rule-text-node"
                        name="text-decoration"
                        value="underline"
                      />
                    </element-node>
                  </element-node>
                  <element-node
                    tag="template"
                    :tag-attrs="{ slot: 'append_style_content' }"
                    v-if="classInlineDynamic"
                  >
                    <element-node tag="object-text-node" prefix=".text-cursive">
                      <element-node
                        tag="css-rule-text-node"
                        name="font-family"
                        value="cursive"
                      />
                    </element-node>
                  </element-node>
                  <element-node
                    tag="template"
                    :tag-attrs="{ slot: 'append_style_content' }"
                    v-if="classAttributeDynamic"
                  >
                    <element-node tag="object-text-node" prefix=".text-normal">
                      <element-node
                        tag="css-rule-text-node"
                        name="font-weight"
                        value="100"
                      />
                    </element-node>
                  </element-node>
                  <element-node tag="template" v-if="classAttributeDynamic">
                    <element-node-attribute
                      name="slot"
                      value="append_data_content"
                    />
                    <element-node tag="object-entry-text-node">
                      <element-node-attribute name="name" value="cssClass" />
                      <element-node-attribute
                        name="value"
                        value="'text-normal'"
                      />
                    </element-node>
                  </element-node>
                </element-node>
                <element-node tag="v-runtime-template" v-if="runGeneratedCode">
                  <element-node-attribute
                    name=":template"
                    value="runnableCode"
                  />
                  <element-node-attribute name="v-if" value="runnableCode" />
                </element-node>
              </element-node>
              <template slot="append_methods_content" v-if="runGeneratedCode">
                <object-entry-text-node
                  name="setRunnableCode"
                  :value="functions.setRunnableCode"
                />
                <object-entry-text-node
                  name="setStyleCode"
                  :value="functions.setStyleCode"
                />
              </template>
              <template slot="append_data_content">
                <object-entry-text-node
                  name="runnableCode"
                  value="null"
                  v-if="runGeneratedCode"
                />
                <object-entry-text-node name="styleCode" value="null" />
                <object-entry-text-node
                  name="dynamicInlineClass"
                  value="text-cursive"
                  quote-value
                  v-if="classInlineDynamic"
                />
                <object-entry-text-node
                  name="tag"
                  :value="tag"
                  quote-value
                  v-if="applyElementNodeDynamically"
                />
                <object-entry-text-node
                  name="skipTag"
                  :value="skipTag"
                  v-if="skipTagConditional"
                />
                <object-entry-text-node
                  name="elementNodeAttributesActive"
                  :value="elementNodeAttributesActive"
                  v-if="applyConditionToAttribute"
                />
                <object-entry-text-node
                  name="cssClass"
                  value="text-normal"
                  quote-value
                  v-if="classAttributeDynamic"
                />
                <object-entry-text-node name="formatterOptions" :value="{}">
                  <object-entry-text-node
                    name="printWidth"
                    :value="printWidth"
                  />
                  <object-entry-text-node name="semi" :value="useSemicolons" />
                </object-entry-text-node>
              </template>
            </vue-sfc-source-code>
          </section>
        </div>
        <div class="col-lg-4">
          <view-on-codepen-button
            class="hidden-xs"
            :js-code="jsCode"
            :html-code="htmlSourceCode"
            :css-code="styleCode"
            :css-dependencies="cssDependencies"
            :js-dependencies="jsDependencies"
          />
          <h3>Step 3: View the Result</h3>
          <hr />
          <h4>Generates this Formatted Source Code</h4>
          <section id="output">
            <v-runtime-template
              :template="htmlSourceCode"
              v-if="htmlSourceCode"
            />
          </section>
        </div>
      </div>
      <!-- <examples /> -->
      <div class="row"><doc class="col-md-12 markdown-body" /></div>
    </div>
    <footer class="footer">
      <div class="container">
        <h4>
          GitHub
          <a href="https://github.com/hunterae" target="_blank" title="GitHub"
            >@hunterae</a
          >
        </h4>
      </div>
    </footer>
  </div>
</template>

<script>
import Doc from '../README.md'
import 'github-markdown-css'
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import CheckboxInput from '@/components/inputs/CheckboxInput'
import SelectInput from '@/components/inputs/SelectInput'
import Accordion from '@/components/Accordion'
import AccordionSection from '@/components/AccordionSection'
import ViewOnCodepenButton from '@/components/ViewOnCodepenButton'
import VRuntimeTemplate from 'v-runtime-template'
import {
  setRunnableCode,
  formatterOptions,
  setStyleCode
} from './SharedFunctions.js'

let stringifyFunction = f => {
  return f.toString().replace(/^\s*function[^(]+/, 'function')
}

// let SomeComponentWithLargeFont = {
//   functional: true,
//   render(h, context) {
//     return h(
//       'div',
//       { ...context.data, style: { fontSize: '50px' } },
//       context.slots().default
//     )
//   }
// }

export default {
  name: 'app',
  components: {
    Doc,
    CheckboxInput,
    SelectInput,
    Accordion,
    AccordionSection,
    VRuntimeTemplate,
    ViewOnCodepenButton
    // SomeComponentWithLargeFont
  },
  data() {
    return {
      htmlSourceCode: null,
      jsCode: null,
      styleCode: null,
      // someComponent: SomeComponentWithLargeFont,
      functions: {
        setRunnableCode: stringifyFunction(setRunnableCode, 'setRunnableCode'),
        setStyleCode: stringifyFunction(setStyleCode, 'setStyleCode'),
        formatterOptions: stringifyFunction(
          formatterOptions,
          'formatterOptions'
        )
      },
      tag: 'h2',
      classInlineStatic: false,
      classInlineDynamic: false,
      classAttributeDynamic: false,
      classAttributeStatic: false,
      styleInlineStatic: false,
      styleInlineDynamic: false,
      styleAttributeDynamic: false,
      styleAttributeStatic: false,
      applyConditionToAttribute: false,
      applyElementNodeDynamically: false,
      skipTagConditional: false,
      useSemicolons: false,
      printWidth: 50,
      runGeneratedCode: true,
      cssDependencies: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        'https://unpkg.com/prismjs@1.16.0/themes/prism-tomorrow.css'
      ],
      jsDependencies: [
        'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.6/vue.min.js',
        'https://unpkg.com/vue-source-code-builder@0.1.3'
      ],
      skipTag: true,
      elementNodeAttributesActive: true,
      runnableCode: null,
      cssClass: 'text-normal',
      dynamicInlineClass: 'text-cursive'
    }
  },
  methods: {
    setRunnableCode,
    setStyleCode
  },
  computed: {
    formatterOptions
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.jumbotron {
  color: white;
  background: #41b883;
}

.footer {
  margin-top: 30px;
  padding: 20px;
  color: white;
  background: #41b883;
  text-align: center;

  a {
    color: white;
  }
}

pre[class*='language-'] {
  border-radius: 6px;
  margin: 0 0 30px 0 !important;
}

.language-markup .token.attr-name {
  color: #b294bb;
}
.language-markup .token.attr-value {
  color: #b5bd68;
}
.language-markup .token.tag,
.language-markup .token.keyword {
  color: #d75a64;
}
.language-markup .token.punctuation {
  color: #8abeb7;
}
.language-javascript .token.function {
  color: #81a2be;
}
.language-javascript .token.string {
  color: #b5bd68;
}

.text-underlined {
  text-decoration: underline;
}

.text-cursive {
  font-family: cursive;
}

.text-normal {
  font-weight: 100;
}

.text-red {
  color: red;
}
</style>
