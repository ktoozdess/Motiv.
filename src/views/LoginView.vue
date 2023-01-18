<template>
    <div class="main container">
        <div class="Motiv-welcome-wrapper animate__animated animate__fadeIn">
            <p> Motiv<span>.</span> created for people <br> who need to get inspiration <br> and motivation, be energized by content.</p>
        </div>
        <div class="form-wrapper animate__animated animate__fadeIn animate__delay-1s">
            <h1>Sign In</h1>
                <input type="email" id="email" placeholder="Email" v-model="email" class="form-control">
                <input type="password" id="password" placeholder="Password" v-model="password" class="form-control">
                <p v-if="errmsg">{{ errmsg }}</p>
                <button @click="signin" class="btn btn-secondary btn-login">Sign In</button>
                <button @click="signInWithGoogle" class="btn btn-secondary btn-login">Sign In With Google</button>
            <p class="login-descr">Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import router from '@/router';
import { setDoc, doc,  collection,getDocs, query } from '@firebase/firestore';
import { db } from '@/firebase/firebase';

const email = ref("")
const errmsg = ref()
const password = ref("")
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
const signin = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() =>{
        console.log("successfully registered");
        router.push('/')
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
        // router.push("/")
        window.location.href = '/'
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
        // width: 50%;
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
            width: 80%;
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