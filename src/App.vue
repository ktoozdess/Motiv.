<template>
  <nav>
    <div class="lefthead">
      <p>Motiv<span>.</span></p>
    </div>
    <div class="righthead">
      <div class="links">
    <li style="width: 48px; height: 48px;" class="nav-item dropdown">
          <a v-if="isLoggedIn" class="nav-link dropdown-toggle"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./assets/add2.png" alt="">
                </a>
    <ul class="dropdown-menu animate__animated animate__fadeIn animate__faster">
      <li><router-link class="dropdown-item" to="/createpostphoto">Create Photo Post</router-link></li>
      <li><router-link class="dropdown-item" to="/createpostquote">Create Quote Post</router-link></li>
    </ul>
  </li>
      </div>

    <li style="width: 48px; height: 48px;" class="nav-item dropdown">
      <a class="nav-link dropdown-toggle"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img referrerpolicy="no-referrer" class="user-photo-profile" v-if="isLoggedIn" :src="auth.currentUser.photoURL"  alt="userLogo" />
      </a>
    <ul class="dropdown-menu animate__animated animate__fadeIn animate__faster">
      <div v-if="isLoggedIn" class="profile-dropdown">
        <img referrerpolicy="no-referrer" class="user-photo-profile" v-if="isLoggedIn" :src="auth.currentUser.photoURL"  alt="userLogo" />
        <div class="profile-txt-info">
          <h6 class="profile-name" v-if="isLoggedIn">{{auth.currentUser.displayName}}</h6>
          <router-link v-if="isLoggedIn" to="/feed" class="profile-link">My profile --></router-link>
        </div>
      </div>
      <li><router-link class="dropdown-item" to="/">Home</router-link></li>
      <li><router-link class="dropdown-item" to="/">Options</router-link></li>
      <li><router-link class="dropdown-item" to="/">Switch theme</router-link></li>
      <li><router-link class="dropdown-item" to="/quotes">Support</router-link></li>
      <!-- <li><router-link class="dropdown-item" to="/about">About Motiv.</router-link></li> -->
      <li><router-link class="dropdown-item"  v-if="isLoggedIn == false" to="/signin">Sign In</router-link></li>
      <hr>
      <li><a class="dropdown-item sign-out" v-if="isLoggedIn" @click="handleSignOut">Sign Out</a></li>

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
    .dropdown-item{
        margin: 0px;
        }

   li{
    a{
      color: #8409F9;
    }
    a:hover{
      color: #FFF;
    }
  }
   span{
    font-size: 48px;
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
  transform: translate3d(-160px, 50px, 0px)!important;
  hr{
    width: 80%;
    color: grey;
    margin: 0 auto;
  }
  li{
    a{
      color: #8409F9;
    }
    a:hover{
      color: #FFF;
      background-color: #0f0f0f;
    }
  }
}

.profile-dropdown{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  padding: 6px;

  .profile-txt-info{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  padding: 6px 10px;
  margin: 6px;
  }
  .profile-name{
    width: max-content;
    color: rgb(162, 162, 162);
  }
  .profile-link{
    font-size: 16px;
    color: grey;
    text-decoration: none;
    width: max-content;
  }
  .profile-link:hover{
      color: rgb(208, 208, 208);;
    }
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

@media screen and (max-width: 976px){
  .dropdown-menu{
  transform: translate3d(10px, 50px, 0px)!important;
  }
}
@media screen and (max-width: 812px){
  .dropdown-menu{
  transform: translate3d(10px, 50px, 0px)!important;
  }
}

</style>
