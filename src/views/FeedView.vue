<template>
    <div>
        <div class="profile-wrapper animate__animated animate__fadeIn animate__delay-1s" v-for="userr in this.userdata" v-bind:key="userr.id">
            <img referrerpolicy="no-referrer" class="user-photo-profile" :src="userr.profilePhoto" alt="userLogo" />
            <div class="profile-txt-info">
                <h3>{{userr.username}}</h3>
                <p>{{user.email}}</p>
                <p>{{ userr.bio }}</p>
            </div>
            <router-link class="btn btn-secondary" to="/updateprofile">Update profile</router-link>
        </div>
        <div class="my-posts-wrapper animate__animated animate__fadeIn animate__delay-1s" >
            <div class="created-saved-links">
               <h4><a class="nav-link" type="button" @click="hrefCreatedPosts">My Posts</a></h4>
               <h4><a class="nav-link" type="button" @click="hrefSavedPosts">Saved Posts <h6>count: {{ countsavedposts }}</h6></a> </h4>
            </div>
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

        <div class="saved-posts-list-wrapper animate__animated animate__fadeIn">
          <router-link v-bind:key="post.id"
          :posts="posts"
          :to="{name: 'PostView', params: {id : post.id}}"
         v-for="post in postsdatasaved" class="post-wrap">
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
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebase";
import { collection,getDocs, query, orderBy } from "firebase/firestore";

export default{
    name: 'FeedView',
    data(){
        const auth = getAuth();
        const user = auth.currentUser;

        let countsavedposts

        return{
            posts:[],
            users:[],
            userdata:[],
            savedposts:[],
            user,
            countsavedposts,
            postsdata:[],
            postsdatasaved:[]
        }
    },
    created(){
        this.fetchdata()
    },
    mounted(){
        document.querySelector('.saved-posts-list-wrapper').classList.add('hidden');
    },
    methods:{
        async fetchdata  () {
    const querySnapshot = await getDocs(query(collection(db, "posts"),orderBy('timestamp')));
    let libposts = []
querySnapshot.forEach((doc) => {
  const post = {
    id: doc.id,
    title: doc.data().title,
    descr: doc.data().descr,
    img: doc.data().img,
    author: doc.data().author,
    UserId: doc.data().UserId,
    imgId: doc.data().imgId,
    timestamp: doc.data().timestamp
  }
  libposts.push(post)
    });
    const querySnapshots = await getDocs(query(collection(db, "savedPosts"), orderBy('timestamp')));
    let libsavedposts = []
    querySnapshots.forEach((doc) => {
    const savedpost ={
        id: doc.id,
        docId: doc.data().docId,
        UserId: doc.data().UserId,
        timestamp: doc.data().timestamp
    }
    libsavedposts.push(savedpost)
    });



    const querySnapshotss = await getDocs(query(collection(db, "users")));
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
    this.savedposts = libsavedposts
    this.posts = libposts
    this.users = libusers
    this.userdata = this.users.filter(user => user.id == this.user.uid)
    this.postsdata = this.posts.filter(post => post.UserId == this.user.uid)

        this.savedposts.map((savedpostrec) =>
            this.posts.forEach(post => {
            if (this.user.uid == savedpostrec.UserId && post.id == savedpostrec.docId)
            this.postsdatasaved.push(post)
            this.countsavedposts = this.postsdatasaved.length
            })
            );
    },
        hrefCreatedPosts(){
            document.querySelector('.saved-posts-list-wrapper').classList.add('hidden');
            document.querySelector('.created-posts-list-wrapper').classList.remove('hidden');
        },
        hrefSavedPosts(){
            document.querySelector('.created-posts-list-wrapper').classList.add('hidden');
            document.querySelector('.saved-posts-list-wrapper').classList.remove('hidden');
        }
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