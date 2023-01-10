<template>
    <div class="browseview-wrapper container ">
      <input class="form-control search animate__animated animate__fadeIn" v-model="search" type="search" placeholder="Search by Title or Descriptions">
      <div class="posts-list-wrapper animate__animated animate__fadeIn animate__delay-1s ">
        <router-link v-bind:key="post.id"
          :posts="posts"
          :to="{name: 'PostView', params: {id : post.id}}"
         v-for="post in filteredItems" class="post-wrap">
            <img :src="post.img" alt="">
          </router-link >

    </div>
    </div>
</template>
<script>
import { db } from "@/firebase/firebase";
import { collection,getDocs, query, orderBy } from "firebase/firestore";


export default {
    name: 'SearchView',
    data(){
      return{
        search: '',
        posts:[],
      }
    },
    computed:{
      filteredItems(){
            return this.posts.filter(post =>{
                return post.title.toLowerCase().includes(this.search) || post.title.toUpperCase().includes(this.search) || post.title.includes(this.search) || post.descr.toLowerCase().includes(this.search) || post.descr.toUpperCase().includes(this.search) || post.descr.includes(this.search)
            })
        }

      },
    created(){
        this.fetchdata()
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
    // const querySnapshotss = await getDocs(query(collection(db, "users")));
    // let libusers = []
    // querySnapshotss.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // // console.log(doc.id, " => ", doc.data());
    // const users ={
    //     id: doc.id,
    //     username: doc.data().username,
    //     profilePhoto: doc.data().profilePhoto
    // }
    // libusers.push(users)
    // });
    this.posts = libposts
    // this.users = libusers
    // this.userdata = this.users.filter(user => user.id == this.user.uid)
    }
}
}
</script>
<style lang="scss">
.posts-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    .browseview-wrapper{
        margin-top: 50px;
    }
    .post-wrap{
        margin: 10px;
        padding: 6px;
        width: 22%;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: center;

        img{
            width: 75%;
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
    .post-wrap{
        width: 42%;
        img{
            width: 100%;
        }
    }
  }
</style>