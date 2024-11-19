import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'

// Add axios default configuration if needed
axios.defaults.headers.common['Content-Type'] = 'application/json'

createApp(App).mount('#app')
