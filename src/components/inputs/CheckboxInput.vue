<template>
  <div class="checkbox">
    <label>
      <input
        v-bind="$attrs"
        type="checkbox"
        :value="value"
        v-model="selected"
      />
      {{ label }}
    </label>
    <span class="help-block" v-if="help">{{ help }}</span>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  inheritAttrs: false,
  computed: {
    selected: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  },
  props: {
    value: {
      default() {
        return this.checked
      }
    },
    checked: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    help: String
  }
}
</script>

<style></style>
