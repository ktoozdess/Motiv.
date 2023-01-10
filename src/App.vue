<template>
  <nav>
    <div class="lefthead">
      <p>Motiv<span>.</span></p>
    </div>
    <div class="righthead">
      <div class="links">
    <router-link  v-if="isLoggedIn" to="/search"><img src="./assets/search3.png" alt=""></router-link>
    <router-link  v-if="isLoggedIn" to="/createpost"><img src="./assets/add2.png" alt=""></router-link>
      </div>

    <li style="width: 48px; height: 48px;" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img referrerpolicy="no-referrer" class="user-photo-profile" v-if="isLoggedIn" :src="auth.currentUser.photoURL"  alt="userLogo" />
      </a>
    <ul class="dropdown-menu animate__animated animate__fadeIn animate__faster">
      <li><router-link class="dropdown-item" to="/">Home</router-link></li>
      <li><router-link class="dropdown-item" to="/about">About Motiv.</router-link></li>
      <li><router-link class="dropdown-item"  v-if="isLoggedIn == false" to="/signin">Sign In</router-link></li>
      <li><router-link class="dropdown-item"  v-if="isLoggedIn" to="/feed">Feed</router-link></li>
      <li><a class="dropdown-item" v-if="isLoggedIn" @click="handleSignOut">Sign Out</a></li>
      <li class="dropdown-item display-name" v-if="isLoggedIn">{{auth.currentUser.displayName}}</li>
    </ul>
  </li>
  </div>
  </nav>
  <router-view/>
</template>
<script setup>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "./router";
import {ref,  onMounted,  } from "vue";
import 'animate.css';


  // let userdata
  const isLoggedIn = ref(false)
  let auth;
  onMounted(() => {
    console.log('mounted');
    auth = getAuth();
    onAuthStateChanged(auth, (user) =>{
      if (user){
        isLoggedIn.value = true;
      } else{
        isLoggedIn.value = false;
      }
    })
    })


  const handleSignOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
      router.push('/signin')
    }).catch((error) => {
    // An error happened.
    console.log(error.message);
    });
  }


</script>

<style lang="scss">
  body{
    background-color: #FFF;
    color: #000000;
    font-family: 'Poppins', sans-serif;
  }
  nav{
  background-color: black;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  align-content: center;
  height: 78px;
  color: #FFF;
}
.righthead{
  margin: auto 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  .links{
    display: flex;
    img{
      width: 42px;
    }
    a{
   text-decoration: none;
   color: #8409F9;
   margin: 0 5px;
   span{
    font-size: 48px;
   }
    }
  }
}
.lefthead{
  margin: auto 0;
  p{
    font-size: 35px;
    margin-bottom: 0px;
    span{
        color: #8409F9;
      }
  }
}
.dropdown{
  display: flex;
  justify-content: center;
}
.dropdown-menu{
  background-color: #0f0f0f;
  border: 0px;
  -webkit-box-shadow: 3px 4px 100px 4px rgba(106, 106, 106, 0.2);
  -moz-box-shadow: 3px 4px 100px 4px rgba(106, 106, 106, 0.2);
  box-shadow: 3px 4px 100px 4px rgba(106, 106, 106, 0.2);
  li{
    a{
      color: #8409F9;
    }
    a:hover{
      background-color: #0f0f0f;
    }
  }
}
.display-name{
  color: #FFF;
}
ul.dropdown-menu.show{
  transform: translate3d(-1px, 0px, 0px)!important;
}
.dropdown-toggle::after {
    display:none;
}
.user-photo-profile{
  border-radius: 50%;
  border: 2px solid #8409F9;
  width: 50px;
  height: 50px;
  img{
  width: 50px;
  height: 50px;
  }
}
</style>
