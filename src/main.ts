import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import i18n from './i18n'
import VueGtag from 'vue-gtag'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App)
    .use(i18n)
    .use(router)
    .use(vuetify)
    .use(VueGtag, { config: { id: 'G-QM6SV98GSR' } })
    .mount('#app')