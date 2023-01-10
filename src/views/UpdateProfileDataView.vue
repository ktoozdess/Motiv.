<template>
    <div>
        <div class="form-wrapper animate__animated animate__fadeIn">
            <h2>Edit your profile</h2>
            <input type="file"
            class="form-control"
            @change="chooseFile"
            >
            <button @click="handleclick" class="btn" >Upload</button>
            <br>
            <input type="text" id="displayName" placeholder="Name" v-model="UserdisplayName" class="form-control" >
            <button class="btn btn-secondary" @click="profileUpdater">Update!</button>
        </div>
    </div>
</template>
<script setup>
import router from "@/router";
import { getAuth, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { ref as refvue } from "vue";
import { setDoc, doc } from "@firebase/firestore";
import { db } from "@/firebase/firebase";
import { getStorage, ref , uploadBytes, getDownloadURL } from "firebase/storage";


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
const storage = getStorage(app);


const auth = getAuth();
const user = auth.currentUser;
const UserdisplayName = refvue("")



const profileUpdater = async() => {
        try {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                username: UserdisplayName.value,
                profilePhoto: user.photoURL
            });
            updateProfile(auth.currentUser, {
        displayName: UserdisplayName.value
    }).then(() => {
        // Profile updated!
        console.log("Profile updated!");
    }).catch((error) => {
        // An error occurred
        console.log(error);
        });
        router.push("/feed")
        } catch (e) {
        console.error("Error adding document: ", e);
        }
}


let file = {};

const chooseFile = (e) => {
    file = e.target.files[0]
}

const handleclick = () => {
    const storageRef  = ref(storage, 'users/' + user.uid + '/profile.jpg');
    uploadBytes(storageRef, file).then(() => {
    console.log('Uploaded a blob or file!');
});

getDownloadURL(ref(storage, 'users/' + user.uid + '/profile.jpg'))
.then(async(url) => {
    // `url` is the download URL for 'images/stars.jpg'
        try {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                username: user.displayName,
                profilePhoto: url
            });
        } catch (e) {
        console.error("Error adding document: ", e);
        }

    updateProfile(auth.currentUser, {
         photoURL: url
    }).then(() => {
        // Profile updated!
        console.log("Profile updated!");
        router.push("/feed")

    }).catch((error) => {
        // An error occurred
        console.log(error);
        });
    })
}

</script>
<style scoped lang="scss">
  .form-wrapper{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
        justify-content: center;
        margin-top: 50px;
        .form-control{
            width: 50%;
        }
        h2{
            margin-bottom: 34px;
        }
    }
</style>