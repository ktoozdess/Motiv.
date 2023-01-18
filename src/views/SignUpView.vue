<template>
    <div class="main container">
        <div class="Motiv-welcome-wrapper animate__animated animate__fadeIn">
            <p> Motiv<span>.</span> created for people <br> who need to get inspiration <br> and motivation, be energized by content.</p>
        </div>
        <div class="form-wrapper animate__animated animate__fadeIn animate__delay-1s">
            <h1>Sign Up</h1>
                <input type="username" id="username" placeholder="Username" v-model="username" class="form-control">
                <input type="email" id="email" placeholder="Email" v-model="email" class="form-control">
                <input type="password" id="password" placeholder="Password" v-model="password" class="form-control">
                <button @click="signup" class="btn btn-secondary btn-login">Sign Up</button>
                <button @click="signInWithGoogle" class="btn btn-secondary btn-login">Sign In With Google</button>
            <p class="login-descr">Already have an account? <router-link to="/signin">Sign In</router-link></p>
        </div>
    </div>
</template>
<script setup>
import { ref ,onMounted} from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,updateProfile } from "firebase/auth";
import router from '@/router';
import { setDoc, doc,collection,getDocs, query } from '@firebase/firestore';
import { db } from '@/firebase/firebase';


const email = ref("")
const password = ref("")
const username = ref("")
const users = ref({})

const fetchdatausrs = async () =>{
const querySnapshotss = await getDocs(query(collection(db, "users")));
    let libusers = []
    querySnapshotss.forEach((doc) => {
    const users ={
        id: doc.id,
        username: doc.data().username,
        profilePhoto: doc.data().profilePhoto
    }
    libusers.push(users)
    });
    users.value = libusers
}

const signup = () => {
    const auth = getAuth()
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async() =>{
        try {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                username: username.value,
                profilePhoto: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
            });
            updateProfile(auth.currentUser, {
                displayName: username.value,
                photoURL: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
            }).then(() => {
                console.log("Profile updated!");
            }).catch((error) => {
        // An error occurred
        console.log(error);
        });

        } catch (e) {
        console.error("Error adding document: ", e);
        }
        console.log("successfully registered");
        // router.push('/feed')
        window.location.href = '/#/feed'
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message)
    });
};
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth()
    signInWithPopup(getAuth(), provider)
    .then(async(result) => {
        try {
            if( Object.keys(users.value.filter(user => user.id == result.user.uid)).length == 0 ){
            await setDoc(doc(db, "users", result.user.uid), {
                username: result.user.displayName,
                profilePhoto: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
            });
            updateProfile(auth.currentUser, {
                username: result.user.displayName,
                photoURL: 'https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'
            }).then(() => {
                console.log("Profile updated!");
            }).catch((error) => {
        // An error occurred
        console.log(error);
        });
            }else{
                console.log('have');
            }
        } catch (e) {
        console.error("Error adding document: ", e);
        }
        router.push("/")
    })
    .catch((error) => {
        console.log(error.message);
    })
};
onMounted(() =>{
    fetchdatausrs()
})
</script>
<style scoped lang="scss">
    .main{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap-reverse;
        justify-content: space-around;
        align-items: center;
        align-content: center;
    }
    .Motiv-welcome-wrapper{
        margin-top: 50px;
        p{
        font-size: 25px;
            span{
                color: #8409F9;
            }
        }
    }
  .form-wrapper{
        // width: 50%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
        justify-content: center;
        margin-top: 50px;
        .form-control{
            width: 60%;
            border-radius: 20px;
        }
        .btn-login{
            border-radius: 25px;
            background-color: #8409F9;
            border: 0px;
            margin: 2px;
            font-weight: 300;
        }
        .btn-login:hover{
            background-color: #FFF;
            color: #8409F9;
            font-weight: 200;
        }
        a{
            color: #8409F9;
            text-decoration: none;
            text-transform: none;
        }
        a:hover{
             color: black;
        }
        .login-descr{
            font-weight: 200;
        }
    }
</style>