import { createApp } from 'vue'
import App from '@/App.vue'
// import './registerServiceWorker'

import { createRouter, createWebHashHistory } from 'vue-router'
import QuizBox from './components/QuizBox.vue'

const router = createRouter({
  history: createWebHashHistory('/scriptrainer/'),
  routes: [
    { path: '/:trainer', component: QuizBox, props: true },
    {
      path: '/',
      redirect: '/Braille'
    }
  ]
})
export const app = createApp(App).use(router).mount('#app')
