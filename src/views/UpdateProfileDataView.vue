<template>
    <div>
        <div class="form-wrapper animate__animated animate__fadeIn">
            <h2>Edit your profile</h2>
            <input type="file"
            class="form-control"
            @change="chooseFile"
            >
            <button @click="handleclick" class="btn btn-secondary" >Upload</button>
            <br>
            <input type="text" id="displayName" placeholder="Name" v-model="UserdisplayName" class="form-control" >
            <button class="btn btn-secondary" @click="profileUpdater">Update!</button>
            <br>
            <input type="text" id="displaybio" placeholder="Bio" v-model="UserBio" class="form-control" >
            <button class="btn btn-secondary" @click="profileUpdaterBio">Update!</button>
        </div>
    </div>
</template>
<script setup>
import router from "@/router";
import { getAuth, updateProfile } from "firebase/auth";
import { ref as refvue } from "vue";
import { doc, updateDoc } from "@firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { ref , uploadBytes, getDownloadURL } from "firebase/storage";



const auth = getAuth();
const user = auth.currentUser;
const UserdisplayName = refvue("")
const UserBio = refvue("")

const profileUpdaterBio = async() =>{
    if(UserBio.value !== ''){
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                bio: UserBio.value,
            });
            router.push("/feed")
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    }
}

const profileUpdater = async() => {
    if (UserdisplayName.value !== ''){

        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                username: UserdisplayName.value,
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

    }else{
        alert('Enter Your Name')
    }
}


let file = {};
console.log(Object.keys(file).length);

const chooseFile = (e) => {
    file = e.target.files[0]
    console.log(file.name);
}

const handleclick = () => {
    if(file.name !== undefined){
        console.log(file.value);
    const storageRef  = ref(storage, 'users/' + user.uid + '/profile.jpg');
    uploadBytes(storageRef, file).then(() => {
    console.log('Uploaded a blob or file!');
});

getDownloadURL(ref(storage, 'users/' + user.uid + '/profile.jpg'))
.then(async(url) => {
    // `url` is the download URL for 'images/stars.jpg'
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
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

}else{
    alert('Choose a Photo')
}
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