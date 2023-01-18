<template>
    <div class="saved-quotes-list-wrapper">
            <router-link v-bind:key="quote.id"
          :quotes="quotes"
          :to="{name: 'QuoteView', params: {id : quote.id}}"
         v-for="quote in quotesdatasaved" class="post-wrap">
           <p class="quote">{{quote.quote}}</p>
          </router-link>
    </div>
</template>
<script>
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebase";
import { collection,getDocs, query, orderBy } from "firebase/firestore";


export default {
    name: 'SavedQuotesItem',
    data(){
        const auth = getAuth();
        const user = auth.currentUser;


        return{
            quotes:[],
            savedquotes:[],
            quotesdatasaved:[],
            user,
        }
    },
    created(){
        this.fetchdata()

    },
    methods:{
        async fetchdata(){
            const querySnapshotssss = await getDocs(query(collection(db, "quotes"),orderBy('timestamp')));
    let libquotes = []
    querySnapshotssss.forEach((doc) => {
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
    const querySnapshotsss = await getDocs(query(collection(db, "savedQuotes"), orderBy('timestamp')));
    let libsavedquotes = []
    querySnapshotsss.forEach((doc) => {
    const savedquote ={
        id: doc.id,
        docId: doc.data().docId,
        UserId: doc.data().UserId,
        timestamp: doc.data().timestamp
    }
    libsavedquotes.push(savedquote)
    });

    this.quotes = libquotes
    this.savedquotes = libsavedquotes


    this.savedquotes.map((savedquoterec) =>
            this.quotes.forEach(quote => {
            if (this.user.uid == savedquoterec.UserId && quote.id == savedquoterec.docId)
            this.quotesdatasaved.push(quote)
            })
            );


        }
    }
}
</script>
<style scoped lang="scss">
.saved-quotes-list-wrapper{
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