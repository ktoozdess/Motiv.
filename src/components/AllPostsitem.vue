<template>
    <div class="allpostItem-wrapper">
        <div class="search-wrapper">
            <div class="search-wrapper-elem">
                <input class="form-control search animate__animated animate__fadeIn" v-model="search" type="search" placeholder="Search">
                <a role="button" @click="filterhandle"><span class="material-symbols-outlined filters-btn">tune</span></a>
            </div>
        </div>
        <div class="selector-all-subs">
            <a class="nav-link" role="button" @click="аа">Random for you</a>
            <a class="nav-link" role="button" @click="ааа">My subscriptions</a>
        </div>
        <div class="grid container">
          <!-- <div class="subscriptions">

          </div> -->
          <div class="selections">
            <router-link v-bind:key="post.id"
          :posts="posts"
          :to="{name: 'PostView', params: {id : post.id}}"
         v-for="post in filteredItemsPosts" class="grid-item">
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
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";


export default {
  name: 'AllPostsItem',
    data(){
        return{
            search: '',
            posts:[],
            quotes:[],
            allinone:[],
        }
    },
    created(){
        this.fetchdata()
    },
    computed:{
    //   filteredItemsAllInOne(){
    //         return this.allinone.filter(all =>{
    //             return all.author.toLowerCase().includes(this.search) || all.author.toUpperCase().includes(this.search) || all.author.includes(this.search) || all.descr.toLowerCase().includes(this.search) || all.descr.toUpperCase().includes(this.search) || all.descr.includes(this.search)
    //         })
    //     },
      filteredItemsPosts(){
            return this.posts.filter(post =>{
                return post.title.toLowerCase().includes(this.search) || post.title.toUpperCase().includes(this.search) || post.title.includes(this.search) || post.descr.toLowerCase().includes(this.search) || post.descr.toUpperCase().includes(this.search) || post.descr.includes(this.search)
            })
        },

      },
    mounted(){
        // if(localStorage.getItem("posts") != this.posts){
        //     localStorage.clear()
        //     localStorage.setItem('posts', this.posts)
        // }

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
        quoteauthor: doc.data().quoteauthor,
        UserId: doc.data().UserId,
        imgId: doc.data().imgId,
        timestamp: doc.data().timestamp
    }
    libposts.push(post)
    });
    // const querySnapshots = await getDocs(query(collection(db, "quotes"),orderBy('timestamp')));
    //     let libquotes = []
    //     querySnapshots.forEach((doc) => {
    // const quote = {
    //     id: doc.id,
    //     quote: doc.data().quote,
    //     descr: doc.data().descr,
    //     author: doc.data().author,
    //     quoteauthor: doc.data().quoteauthor,
    //     UserId: doc.data().UserId,
    //     timestamp: doc.data().timestamp
    // }
    // libquotes.push(quote)
    // });
    // this.quotes = libquotes
    this.posts = libposts.sort(()=>Math.random()-0.5)
    // this.allinone = this.posts.concat(this.quotes).sort(()=>Math.random()-0.5)

}
    },
}


</script>
<style lang="scss" scoped>
        .search-wrapper{
            display: flex;
            justify-content: center;
            margin: 20px;

            .search-wrapper-elem{
                width: 60%;
                display: flex;
                justify-content: center;
                border: 1px solid silver;
                border-radius: 20px;
                padding: 3px;
            }
            .search{
                border: 0px;
            }
            .filters-btn{
                color: grey;
                font-size: 32px;
                padding: 10px;
            }
        }
        .selector-all-subs{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            align-content: center;
            justify-content: center;
            margin-top: 25px;
            margin-bottom: 25px;
            a{
                color: grey;
                font-size: 24px;
                margin: 6px 10px;
            }
        }
    .grid{
        line-height: 0;
        padding: 10px;
        -webkit-column-count: 5;
        -webkit-column-gap:   20px;
        -moz-column-count:    5;
        -moz-column-gap:      20px;
        column-count:         4;
        column-gap:           10px;
    }
    .grid-item{
        width: 80% !important;
        height: auto !important;
        img{
            width: 90%;
            margin: 10px;
            border-radius: 20px;
        }
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
    @media screen and (max-width: 1028px){

    }
  @media screen and (max-width: 894px){
    .grid{
        line-height: 0;
        padding: 10px;
        -webkit-column-count: 5;
        -webkit-column-gap:   20px;
        -moz-column-count:    5;
        -moz-column-gap:      20px;
        column-count:         3;
        column-gap:           10px;
    }
    .grid-item{
        width: 80% !important;
        height: auto !important;
        img{
            width: 90%;
            margin: 10px;
            border-radius: 20px;
        }
    }
  }
  @media screen and (max-width: 575px){
    .grid{
        column-gap: 5px;
    }
    .grid-item{
        width: 90% !important;
        height: auto !important;
        img{
            width: 100%;
            margin: 10px;
            border-radius: 20px;
        }
    }
  }
</style>