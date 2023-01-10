<template>
    <div>
        <h2>Your Profile</h2>
        <div class="profile-wrapper animate__animated animate__fadeIn animate__delay-1s" v-for="userr in this.userdata" v-bind:key="userr.id">
            <p><img referrerpolicy="no-referrer" class="user-photo-profile" :src="userr.profilePhoto" alt="userLogo" /></p>
            <h3>{{userr.username}}</h3>
            <p>{{user.email}}</p>
            <router-link class="nav-link" to="/updateprofile">Update profile</router-link>
        </div>
        <div class="my-posts-wrapper animate__animated animate__fadeIn animate__delay-1s" >
            <h4><a class="nav-link"  @click="hrefCreatedPosts">Created Posts</a> <a  class="nav-link"  @click="hrefSavedPosts">Saved Posts</a></h4>
            <div class="created-posts-list-wrapper animate__animated animate__fadeIn">
          <router-link v-bind:key="post.id"
          :posts="posts"
          :to="{name: 'PostView', params: {id : post.id}}"
         v-for="post in postsdata" class="post-wrap">
            <img :src="post.img" alt="">
          </router-link >
        </div>

        <div class="saved-posts-list-wrapper animate__animated animate__fadeIn">
          <router-link v-bind:key="post.id"
          :posts="posts"
          :to="{name: 'PostView', params: {id : post.id}}"
         v-for="post in postsdatasaved" class="post-wrap">
            <img :src="post.img" alt="">
          </router-link >
        </div>

        </div>
    </div>
</template>
<script>
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebase";
// import CreatedPostsFeedItem from "../components/CreatedPostsFeedItem.vue";
// import SavedPostsFeedItem from '../components/SavedPostsFeedItem.vue'
import { collection,getDocs, query, orderBy } from "firebase/firestore";

export default{
    name: 'FeedView',
    components:{
        // CreatedPostsFeedItem,
        // SavedPostsFeedItem
    },
    data(){
        const auth = getAuth();
        const user = auth.currentUser;

        let displayNamePrint

        return{
            posts:[],
            users:[],
            userdata:[],
            savedposts:[],
            user,
            displayNamePrint,
            postsdata:[],
            postsdatasaved:[]
        }
    },
    created(){
        this.fetchdata()

    },
    mounted(){
        document.querySelector('.saved-posts-list-wrapper').classList.add('hidden');
        this.displayNamePrint = 'hello'
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
        profilePhoto: doc.data().profilePhoto
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
            })
            );
    },
        hrefCreatedPosts(){
            document.querySelector('.created-posts-list-wrapper').classList.remove('hidden');
            document.querySelector('.saved-posts-list-wrapper').classList.add('hidden');
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
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: center;
        a{
            color: #8409F9;
        }
        a:hover{
            color: black;
        }
    }
    .my-posts-wrapper{
        margin-top: 50px;
        h4{
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
        a:hover{
            color: black;
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