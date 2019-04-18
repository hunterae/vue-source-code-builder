<template>
  <div class="panel-group" role="tablist"><slot></slot></div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: null
    }
  },
  provide() {
    // Approach based on https://medium.com/@znck/provide-inject-in-vue-2-2-b6473a7f7816
    return { sharedData: this.$data }
  },
  mounted() {
    this.$on('expanded', expandedSection => {
      this.activeSection = expandedSection
    })
    this.activeSection = this.$children[0].$vnode.componentOptions.propsData.title
  }
}
</script>

<style></style>
