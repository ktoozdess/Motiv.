import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXY3qNsFIavwcgjoc_AUiKgsBZKDPhKlo",
    authDomain: "motiv-178d5.firebaseapp.com",
    projectId: "motiv-178d5",
    storageBucket: "motiv-178d5.appspot.com",
    messagingSenderId: "781048548833",
    appId: "1:781048548833:web:3383476882110c55d396a0",
    measurementId: "G-39DWWG2MPX"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);


    export{
        db, storage
    }