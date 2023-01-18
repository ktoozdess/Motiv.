<template>
    <div>
        <div class="posts-list-wrapper animate__animated animate__fadeIn animate__delay-2s">
          <router-link v-bind:key="post.id"
          :posts="posts"
          :to="{name: 'PostView', params: {id : post.id}}"
         v-for="post in posts" class="post-wrap">
            <img :src="post.img" alt="">
          </router-link>
        </div>
    </div>
</template>
<script>
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";


export default {
  name: 'AllPostsItem',
    data(){
        return{
            posts:[],
        }
    },
    created(){
        this.fetchdata()
    },
    mounted(){
        if(localStorage.getItem("posts") != this.posts){
            localStorage.clear()
            localStorage.setItem('posts', this.posts)
        }
    },
    methods:{
        async fetchdata () {
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
    this.posts = libposts
}
    },
}


</script>
<style lang="scss" scoped>
    .posts-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
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
        width: 45%;
        img{
            width: 100%;
        }
    }
  }
</style>