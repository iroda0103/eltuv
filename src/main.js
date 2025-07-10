import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome/index.es'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faSearch, faLocation, faCar, faArrowLeft, faGift, faEllipsisV,faTrash,faUtensils} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faStar, faSearch, faLocation, faCar, faArrowLeft, faGift, faEllipsisV, faTrash,faUtensils)
import './assets/base.css'

createApp(App).use(createPinia()).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
