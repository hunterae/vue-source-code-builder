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
                v-model="options.useSemicolons"
                label="Use Semicolons in formatted Javascript"
              />
              <select-input
                v-model.number="options.printWidth"
                label="Print Width"
                :options="[20, 30, 40, 50, 60, 70]"
              />
              <checkbox-input
                v-model="options.runGeneratedCode"
                label="Run the Generated Source Code?"
                help="Uses the external Vue plugin VRuntimeTemplate"
              />
            </accordion-section>
            <accordion-section title="Creating an HTML Tag">
              <select-input
                label="Applying the Html Tag"
                :options="['h1', 'h2', 'h3', 'h4', 'h5', 'h6']"
                v-model="options.tag"
                help="Applied as the 'tag' prop for the html-tag component"
              />
              <checkbox-input
                v-model="options.applyHtmlTagDynamically"
                label="Apply the tag dynamically"
              />
              <checkbox-input
                v-model="options.skipTagConditional"
                label="Apply a conditional to skip the tag and only render the content within?"
              />
              <checkbox-input
                v-model="skipTag"
                label="Condition True?"
                v-if="options.skipTagConditional"
              />
            </accordion-section>
            <accordion-section title="Applying CSS Classes">
              <p>
                <i>The following options apply CSS classes to the element</i>
              </p>
              <checkbox-input
                v-model="options.classInlineStatic"
                label="As an static attribute on the html-tag"
              />
              <checkbox-input
                v-model="options.classInlineDynamic"
                label="As an dynamic attribute on the html-tag"
              />
              <checkbox-input
                v-model="options.classAttributeStatic"
                label="As a separate html-tag-attribute element with a static value"
              />
              <checkbox-input
                v-model="options.classAttributeDynamic"
                label="As a separate html-tag-attribute element with a dynamic value"
              />
            </accordion-section>
            <accordion-section title="Apply CSS Styles">
              <p>
                <i>The following options apply CSS styles to the element</i>
              </p>
              <checkbox-input
                v-model="options.styleInlineStatic"
                label="As an static attribute on the html-tag"
              />
              <checkbox-input
                v-model="options.styleInlineDynamic"
                label="As an dynamic attribute on the html-tag"
              />
              <checkbox-input
                v-model="options.styleAttributeStatic"
                label="As a separate html-tag-attribute element with a static value"
              />
              <checkbox-input
                v-model="options.styleAttributeDynamic"
                label="As a separate html-tag-attribute element with a dynamic value"
              />
            </accordion-section>
            <accordion-section title="Apply Conditions">
              <checkbox-input
                v-model="options.applyConditionToAttribute"
                label="Apply a v-if condition to all html-tag-attribute elements"
              />
              <checkbox-input
                v-model="htmlTagAttributesActive"
                label="Condition True?"
                v-if="options.applyConditionToAttribute"
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
              :semicolons="options.useSemicolons"
              :print-width="options.printWidth"
            >
              <html-tag tag="div">
                <html-tag tag="h4"
                  >Generates this Formatted Source Code:</html-tag
                >
                <html-tag tag="vue-sfc-source-code">
                  <html-tag-attribute
                    name="@update:template"
                    value="setRunnableCode"
                    v-if="options.runGeneratedCode"
                  />
                  <html-tag-attribute
                    name="semicolons"
                    v-if="options.useSemicolons"
                  />
                  <html-tag-attribute
                    name=":print-width"
                    :value="options.printWidth"
                  />
                  <html-tag tag="html-tag">
                    <html-tag-attribute name="tag" value="div" />

                    <html-tag tag="html-tag">
                      <html-tag-attribute
                        name=":tag"
                        value="tag"
                        v-if="options.applyHtmlTagDynamically"
                      />
                      <html-tag-attribute
                        name="tag"
                        :value="options.tag"
                        v-else
                      />
                      <html-tag-attribute
                        name=":skip-tag"
                        value="skipTag"
                        v-if="options.skipTagConditional"
                      />
                      <html-tag-attribute
                        name=":class"
                        value="dynamicInlineClass"
                        v-if="options.classInlineDynamic"
                      />
                      <html-tag-attribute
                        name="class"
                        value="text-underlined"
                        v-if="options.classInlineStatic"
                      />
                      <html-tag
                        tag="html-tag-attribute"
                        name=":class"
                        value="cssClass"
                        v-if="options.classAttributeDynamic"
                      >
                        <html-tag-attribute
                          name="v-if"
                          value="htmlTagAttributesActive"
                          v-if="options.applyConditionToAttribute"
                        />
                      </html-tag>
                      <html-tag
                        tag="html-tag-attribute"
                        name="class"
                        value="text-red"
                        v-if="options.classAttributeStatic"
                      >
                        <html-tag-attribute
                          name="v-if"
                          value="htmlTagAttributesActive"
                          v-if="options.applyConditionToAttribute"
                        />
                      </html-tag>
                      <html-tag-attribute
                        name=":style"
                        value="{ 'font-style': 'italic' }"
                        v-if="options.styleInlineDynamic"
                      />
                      <html-tag-attribute
                        name="style"
                        value="background-color: green"
                        v-if="options.styleInlineStatic"
                      />
                      <html-tag
                        tag="html-tag-attribute"
                        name=":style"
                        value="{ textAlign: 'center' }"
                        v-if="options.styleAttributeDynamic"
                      >
                        <html-tag-attribute
                          name="v-if"
                          value="htmlTagAttributesActive"
                          v-if="options.applyConditionToAttribute"
                        />
                      </html-tag>
                      <html-tag
                        tag="html-tag-attribute"
                        name="style"
                        value="text-transform: uppercase;"
                        v-if="options.styleAttributeStatic"
                      >
                        <html-tag-attribute
                          name="v-if"
                          value="htmlTagAttributesActive"
                          v-if="options.applyConditionToAttribute"
                        /> </html-tag
                      >Output of Running Source Code
                    </html-tag>
                  </html-tag>
                  <pre tag="pre" is="html-tag">
                      <html-tag-attribute name="slot='script'"/>
          export default {
            data () {
              return {
                <text-element
  v-if="options.classAttributeDynamic"
>
                cssClass: 'text-normal'
                </text-element>
              }
            }
          }
       </pre>
                  <pre tag="pre" is="html-tag">
                    <html-tag-attribute name="slot='styles'"/>
          <text-element v-if="options.classInlineStatic">
          .text-underlined {
            text-decoration: underline;
          }
          </text-element>
          <text-element v-if="options.classInlineDynamic">
          .text-cursive {
            font-family: cursive;
          }
          </text-element>
          <text-element v-if="options.classAttributeDynamic">
          .text-normal {
            font-weight: 100;
          }
          </text-element>
          <text-element v-if="options.classAttributeStatic">
          .text-red {
            color: red;
          }
          </text-element>
       </pre>
                </html-tag>
                <html-tag
                  tag="v-runtime-template"
                  v-if="options.runGeneratedCode"
                >
                  <html-tag-attribute name=":template" value="runnableCode" />
                  <html-tag-attribute name="v-if" value="runnableCode" />
                </html-tag>
              </html-tag>
              <pre slot="script">
                export default { 
                  methods: {
                    <text-element
  v-if="options.runGeneratedCode"
>
                    setRunnableCode(code) {
                      this.runnableCode = code
                    },
                    </text-element>
                  },
                  data () {
                    return {
                      <text-element
  v-if="options.runGeneratedCode"
>
                      runnableCode: null,
                      </text-element>
                      <text-element v-if="options.classInlineDynamic">
                      dynamicInlineClass: 'text-cursive',
                      </text-element>
                      <text-element v-if="options.applyHtmlTagDynamically">
                      tag: '{{ options.tag }}',
                      </text-element>
                      <text-element v-if="options.skipTagConditional">
                      skipTag: {{ skipTag }},
                      </text-element>
                      <text-element v-if="options.applyConditionToAttribute">
                      htmlTagAttributesActive: {{ htmlTagAttributesActive }},
                      </text-element>
                    }
                  }
                }
              </pre>
            </vue-sfc-source-code>
          </section>
        </div>
        <div class="col-lg-4">
          <view-on-codepen-button
            :js-code="jsCode"
            :html-code="htmlSourceCode"
            :css-dependencies="cssDependencies"
            :js-dependencies="jsDependencies"
          />
          <h3>Step 3: View the Result</h3>
          <hr />
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
  },
  data() {
    return {
      htmlSourceCode: null,
      jsCode: null,
      options: {
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
        applyHtmlTagDynamically: false,
        skipTagConditional: false,
        useSemicolons: false,
        printWidth: 50,
        runGeneratedCode: true
      },
      cssDependencies: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        'https://unpkg.com/prismjs@1.16.0/themes/prism-tomorrow.css'
      ],
      jsDependencies: [
        'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.6/vue.min.js',
        'https://unpkg.com/v-runtime-template@1.5.2/dist/v-runtime-template.js',
        'https://unpkg.com/vue-source-code-builder@0.0.16/dist/vue-source-code-builder.min.js'
      ],
      skipTag: true,
      htmlTagAttributesActive: true,
      runnableCode: null,
      cssClass: 'text-normal',
      dynamicInlineClass: 'text-cursive'
    }
  },
  methods: {
    setRunnableCode(code) {
      this.runnableCode = code
    }
  },
  computed: {
    tag() {
      return this.options.tag
    }
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
