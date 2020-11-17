import { createApp } from 'vue'
import App from "@/App.vue"
import './registerServiceWorker'

export const app = createApp(App).mount("#app")
let userinput = document.getElementById("userinput");
if (userinput !== null) {
    userinput.focus()
}