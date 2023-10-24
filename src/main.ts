import { createApp } from 'vue'
import App from '@/App.vue'
// import './registerServiceWorker'

import { createRouter, createWebHashHistory } from 'vue-router'
import quizboxVue from './components/quizbox.vue'

const router = createRouter({
  history: createWebHashHistory('/scriptrainer/'),
  routes: [
    { path: '/:trainer', component: quizboxVue, props: true },
    {
      path: '/',
      redirect: '/Braille'
    }
  ]
})
export const app = createApp(App).use(router).mount('#app')
