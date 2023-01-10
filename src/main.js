import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXY3qNsFIavwcgjoc_AUiKgsBZKDPhKlo",
  authDomain: "motiv-178d5.firebaseapp.com",
  projectId: "motiv-178d5",
  storageBucket: "motiv-178d5.appspot.com",
  messagingSenderId: "781048548833",
  appId: "1:781048548833:web:3383476882110c55d396a0",
  measurementId: "G-39DWWG2MPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



createApp(App).use(router).use(analytics).mount('#app')
