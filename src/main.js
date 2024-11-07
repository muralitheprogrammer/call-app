import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    // Set toast options here.
};

createApp(App).use(Toast, options).mount('#app');
