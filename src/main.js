/**
 * @file The file "main.js" is used for global import of basic components.
 */

import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
