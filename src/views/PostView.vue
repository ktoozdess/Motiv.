<template>
    <div class="post-view-wrapper animate__animated animate__fadeIn">
        <div id="suredelete" class="suredelete animate__animated animate__fadeIn">
                    <p>Delete this post?</p>
                    <a @click="canceldelete" class="btn btn-cancel">Cancel</a>
                    <a @click="deletePost" class="btn btn-delete">Yes</a>
                </div>
        <div class="post">
            <div class="post-leftside-image animate__animated animate__fadeIn animate__delay-1s">
                <img :src="post.img" alt="">
            </div>
            <div class="post-rightside-text animate__animated animate__fadeIn animate__delay-1s">
                <div class="hrefs-wrap">
                    <li class="nav-item dropdown dropdown-post-share">
          <a   class="nav-link dropdown-toggle"  role="button" style="margin-left: 0px;cursor: pointer;" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="material-symbols-outlined">share</span>
                </a>
                <a  v-if="post.UserId == user.uid"  style="cursor: pointer;"  @click="sureDeletePost"><span class="material-symbols-outlined">delete</span></a>
                <a  class="savepost animate__animated animate__pulse" style="cursor: pointer;" @click="savePost" v-if="this.savedpost == undefined" ><span class="material-symbols-outlined">bookmark</span></a>
                <a  class="delpost animate__animated animate__pulse"  style="cursor: pointer;"  @click="deleteFromSaved" v-if="this.savedpost != undefined" ><span class="material-symbols-outlined">bookmark_remove</span></a>
                <div class="dropdown-menu dropdown-menu-post animate__animated animate__fadeIn">
                <p class="nav-link">Share</p>
                <!-- <a @click="facebookClick" href="#"><img src="../assets/facebook.svg" alt=""></a> -->
                <a style="cursor: pointer;" @click="copyLink"><img src="../assets/copyLink.svg" alt=""></a>
                <a  style="cursor: pointer;" @click="telegramClick" ><img src="../assets/telegram.svg" alt=""></a>
            </div>
        </li>
            </div>
            <p>{{post.title}}</p>
            <p>{{post.descr}}</p>
            <p>Author: {{post.author}}</p>
        </div>
        </div>
    </div>
</template>
<script >
import {  deleteDoc,doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import router from "@/router";
import { getAuth } from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { collection,getDocs, addDoc } from "firebase/firestore";


export default {
  name: 'PostView',
    data(){
        const auth = getAuth();
        const user = auth.currentUser
        const storage = getStorage();

        return{
            posts:[],
            savedposts:[],
            post:{},
            savedpost:{},
            user,
            storage,
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
    UserId: doc.data().UserId,
    imgId: doc.data().imgId,
    timestamp: doc.data().timestamp
  }
  libposts.push(post)
});
const querySnapshots = await getDocs(collection(db, "savedPosts"));
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
this.savedposts = libsavedposts
this.posts = libposts
this.id = this.$route.params.id;
this.post = this.posts.find((post) => post.id == this.id)
this.savedpost = this.savedposts.find((savedpost) => savedpost.docId == this.post.id && savedpost.UserId == this.user.uid)
},

        sureDeletePost(){
            document.getElementById('suredelete').classList.add('sure-delete-display');
            console.log(this.post.imgId);
        },
        canceldelete(){
            document.getElementById('suredelete').classList.remove('sure-delete-display');
        },
        async deletePost (){
            const desertRef = ref(this.storage,'posts/' +  this.post.imgId + '/post.jpg');
                // Delete the file
                deleteObject(desertRef).then(() => {
                // File deleted successfully
                deleteDoc(doc(db, "posts", this.post.id))
            .then(() => {

                console.log("Document successfully deleted!");
                }).catch(function(error) {
                console.error("Error removing document: ", error);
                });
                console.log('Successfully');
                router.push('/')
                }).catch((error) => {
                console.log(error);
                });

        },
        async savePost(){
            try {
        const docRef = await addDoc(collection(db, "savedPosts"), {
            docId: this.post.id,
            UserId: this.user.uid,
            timestamp: -(+new Date())
        });
        console.log("Document written with ID: ", docRef.id);
        this.fetchdata()
        } catch (e) {
        console.error("Error adding document: ", e);
        }

        },
         deleteFromSaved(){
            deleteDoc(doc(db, "savedPosts", this.savedpost.id));
            this.fetchdata();
        },

        telegramClick(){
            window.location='https://t.me/share/url?url='+ window.location.href + '&text=Hey, you gotta look at this!';
        },
        copyLink() {
            navigator.clipboard.writeText(window.location.href);
        }
        // facebookClick(){
        //     window.location='https://www.facebook.com/dialog/share?app_id=145634995501895&display=page&href=' + window.location.href + '&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer';
        // }

    }

}



</script>
<style lang="scss" scoped>
    .post-view-wrapper{
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
    }
    .post{
        padding: 28px;
        margin-top: 60px;
        -webkit-box-shadow: 0px 0px 89px 8px rgba(132,9,249,0.21);
        -moz-box-shadow: 0px 0px 89px 8px rgba(132,9,249,0.21);
        box-shadow: 0px 0px 89px 8px rgba(132,9,249,0.21);
        display: flex;
        flex-wrap: wrap;
        border-radius: 20px;
    }
    .post-leftside-image{
        margin: 0 25px;
        width: 488px;
        img{
            border-radius: 16px;
            width: 100%;
        }
    }
    .hrefs-wrap{
        margin-bottom: 30px;
        a{
            margin: 0 14px;
        }
    }
    .post-rightside-text{
        margin: 0 25px;
    }
    .material-symbols-outlined {
    font-size: 36px;
    color: #8409F9;
    font-variation-settings:
    'FILL' 0,
    'wght' 600,
    'GRAD' 0,
    'opsz' 48
    }
    .dropdown-post-share{
        justify-content: flex-start;
    }
    .dropdown-menu .show{
        transform: translate3d(0px, 40px, 0px) !important;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: flex-start;

    }
    .dropdown-menu-post{
        background: rgba(255,255,255,0.5);
        img{
            width: 49px;
            margin: 8px;
        }
        p{
            margin: 0px;
            text-decoration: underline;
        }
    }
    .suredelete{
        display: none;
        position: absolute;
        z-index: 1000;
        background-color: #FFF;
        padding: 20px 45px;
        border-radius: 15px;
        -webkit-box-shadow: 0px 0px 300px 153px rgba(133,9,249,1);
        -moz-box-shadow: 0px 0px 300px 153px rgba(133,9,249,1);
        box-shadow: 0px 0px 300px 153px rgba(133,9,249,1);
        .btn-delete{
            background-color: #8409F9;
        }
    }
    .sure-delete-display{
        display: block;
    }

    .blockdel {
    display: none;
    text-align: center;
    z-index: 1000;
    position:absolute;
}
.blocksve{
    display: none;
    text-align: center;
    margin-top: 50px;
    z-index: 1000;
    position:absolute;
}
@media screen and (max-width: 1028px){
    .post-leftside-image{
        margin: 0 25px;
        width: 50%;
        img{
            border-radius: 16px;
            width: 90%;
        }
    }
  }
  @media screen and (max-width: 670px){
    .post{
        justify-content: center;
        margin-top: 0px;
    }
    .post-leftside-image{
        margin: 0 25px;
        width: 70%;
    }
    .post-rightside-text{
        margin-top: 35px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 70%;
    }
  }
  @media screen and (max-width: 575px){
    .post-leftside-image{
        margin: 0 25px;
        width: 60%;
    }
    .post-rightside-text{
        margin-top: 35px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 60%;
    }
  }

</style>