<template>
    <div>
        <div class="profile-wrapper animate__animated animate__fadeIn animate__delay-1s" v-for="userr in this.userdata" v-bind:key="userr.id">
            <img referrerpolicy="no-referrer" class="user-photo-profile" :src="userr.profilePhoto" alt="userLogo" />
            <div class="profile-txt-info">
                <h3>{{userr.username}}</h3>
                <p>{{ userr.bio }}</p>
            </div>
            <router-link class="btn btn-secondary" to="/">Subscribe</router-link>
        </div>
        <div class="my-posts-wrapper animate__animated animate__fadeIn animate__delay-1s" >

            <div class="created-posts-list-wrapper animate__animated animate__fadeIn">
          <router-link v-bind:key="post.id"
          :posts="posts"
          :to="{name: 'PostView', params: {id : post.id}}"
         v-for="post in postsdata" class="post-wrap">
         <img :src="post.img" alt="">
            <div v-if="post.img == undefined" class="quote-wrap">
                <p class="quote" >{{ post.title }}</p>
            </div>
          </router-link >
        </div>
        </div>
    </div>
</template>
<script>
import { db } from "@/firebase/firebase";
import { collection,getDocs } from "firebase/firestore";


export default {
    name: 'ProfileUserView',
    data(){

        return{
            userdata:[],
            posts:[],
            postsdata:[]
        }
    },
    created(){
        this.fetchdata()
    },
    methods:{
  async fetchdata  () {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let libposts = []
querySnapshot.forEach((doc) => {
  const post = {
    id: doc.id,
    title: doc.data().title,
    descr: doc.data().descr,
    img: doc.data().img,
    author: doc.data().author,
    quoteauthor: doc.data().quoteauthor,
    UserId: doc.data().UserId,
    imgId: doc.data().imgId,
    timestamp: doc.data().timestamp
  }
  libposts.push(post)
});
const querySnapshotss = await getDocs((collection(db, "users")));
    let libusers = []
    querySnapshotss.forEach((doc) => {
    const users ={
        id: doc.id,
        username: doc.data().username,
        profilePhoto: doc.data().profilePhoto,
        bio: doc.data().bio,
    }
    libusers.push(users)
    });

    this.users = libusers
    this.posts = libposts
    this.id = this.$route.params.id;
    this.userdata = this.users.filter(user => user.id == this.id)
    this.postsdata = this.posts.filter(post => post.UserId == this.userdata.id)

    this.userdata.map((userdatadata) =>
            this.posts.forEach(post => {
            if (post.UserId == userdatadata.id)
            this.postsdata.push(post)
            })
            );
},


    }

}
</script>
<style scoped lang="scss">
    .hidden{
        display: none!important;
    }
    h2{
        text-align: center;
        padding: 10px;
    }

    .user-photo-profile{
        border-radius: 50%;
        border: 2px solid #8409F9;
        width: 120px;
        height: 120px;
    }
    .profile-wrapper{
        margin-top: 100px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: center;
        a{
            color: #FFF;
        }
        a:hover{
            color: black;
            background-color: none;
        }
        .profile-txt-info{
            margin: 0px 36px;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            align-items: flex-start;
            align-content: flex-start;
            justify-content: center;
        }
    }
    .my-posts-wrapper{
        margin-top: 100px;
        .created-saved-links{
        padding: 10px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: center;

        a{
            color: #8409F9;
            margin: 0 18px;
            padding: 10px;
        }

    }
    }
    .created-posts-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
    .saved-posts-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
    .quote-wrap{
        color:black;
        text-decoration: none;
        border-radius: 20px;
        padding: 10px 30px;
        width: 90%;
        min-height: 300px;
        margin: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: center;
        background-color: rgb(253, 253, 253);
        .quote{
          line-height: 25px;
          text-align: center;

        }
        .quote:hover{
          color: #8409F9;
        }
      }
    .post-wrap{
        margin: 10px;
        padding: 8px;
        width: 22%;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;


        img{
            width: 65%;
            border-radius: 20px;

        }
    }
    @media screen and (max-width: 1028px){
        .post-wrap{
        width: 22%;
        img{
            width: 85%;
        }
    }
  }
  @media screen and (max-width: 894px){
        .post-wrap{
        width: 25%;
        img{
            width: 100%;
        }
    }
  }
  @media screen and (max-width: 575px){
    h4{
        font-size: 20px;
    }
    .post-wrap{
        width: 45%;
        img{
            width: 100%;
        }
    }
  }



</style>