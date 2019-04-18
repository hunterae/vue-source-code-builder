import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'presets',
      path: '/:preset?'
      // props: true
    }
  ]
})
