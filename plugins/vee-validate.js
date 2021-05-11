import Vue from 'vue'

import { extend, localize, ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email, max, regex } from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

extend('required', required)
extend('email', email)
extend('max', max)
extend('regex', regex)

localize({
  en
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
