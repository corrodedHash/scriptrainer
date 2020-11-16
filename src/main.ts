import Vue from 'vue'
import App from "./App.vue"
// Vue.config.performance = true
// Vue.config.devtools = true
export var app = new Vue({
    el: "#app",
    render: h => h(App)
});
let userinput = document.getElementById("userinput");
if (userinput !== null) {
    userinput.focus()
}