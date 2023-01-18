<template>
    <div>
        <div class="posts-list-wrapper animate__animated animate__fadeIn animate__delay-1s">
          <router-link v-bind:key="quote.id"
          :quotes="quotes"
          :to="{name: 'QuoteView', params: {id : quote.id}}"
         v-for="quote in quotes" class="post-wrap">
           <p class="quote">{{quote.quote}}</p>
          </router-link>
        </div>
    </div>
</template>

<script>
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";


export default {
  name: 'QuotesView',
    data(){
        return{
            quotes:[],
        }
    },
    created(){
        this.fetchdata()
    },
    mounted(){
        // if(localStorage.getItem("posts") != this.posts){
        //     localStorage.clear()
        //     localStorage.setItem('posts', this.posts)
        // }
    },
    methods:{
        async fetchdata () {
    const querySnapshot = await getDocs(query(collection(db, "quotes"),orderBy('timestamp')));
    let libquotes = []
querySnapshot.forEach((doc) => {
  const quote = {
    id: doc.id,
    quote: doc.data().quote,
    descr: doc.data().descr,
    author: doc.data().author,
    quoteauthor: doc.data().quoteauthor,
    UserId: doc.data().UserId,
    timestamp: doc.data().timestamp
  }
  libquotes.push(quote)
});


    this.quotes = libquotes
}
    },
}

</script>
<style scoped lang="scss">
.posts-list-wrapper{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
.post-wrap{
        color:black;
        text-decoration: none;
        margin: 10px;
        padding: 6px 20px;
        width: 22%;
        min-height: 400px;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: center;
        background-color: rgb(253, 253, 253);
        .quote{
          width: 75%;
          text-align: center;
        }
        .quote:hover{
          color: #8409F9;
        }
//         -webkit-box-shadow: 0px 0px 68px 0px rgba(133,9,249,0.1);
// -moz-box-shadow: 0px 0px 68px 0px rgba(133,9,249,0.1);
// box-shadow: 0px 0px 68px 0px rgba(133,9,249,0.1);

     }
//     .post-wrap:hover{
//      -webkit-box-shadow: 0px 0px 68px 0px rgba(133,9,249,0.1);
// -moz-box-shadow: 0px 0px 68px 0px rgba(133,9,249,0.1);
// box-shadow: 0px 0px 68px 0px rgba(133,9,249,0.1);
//     }
    @media screen and (max-width: 1190px){
        .post-wrap{
        width: 30%;
    }
  }
  @media screen and (max-width: 930px){
        .post-wrap{
        width: 43%;
    }
  }
  @media screen and (max-width: 600px){
        .post-wrap{
        width: 90%;
        min-height: 250px;
    }
  }
</style>