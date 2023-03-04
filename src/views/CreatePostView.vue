<template>
    <div class="create-post-wrapper animate__animated animate__fadeIn ">
        <h3>Create New Post</h3>
        <div class="form-wrapper">
            <div class="form-file">
                <input class="form-control" type="file"
                    @change="chooseFilePost"
                >
            </div>
            <div class="form-post-txt-data">
                <input type="text" id="title" placeholder="Title" v-model="Posttitle" class="form-control">
                <input type="text" id="descr" placeholder="Descriptions" v-model="Postdescr" class="form-control">
                <button @click="CreatePostSubmit" class="btn btn-secondary">Save!</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { ref , uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as refvue } from "vue";
import { v4 as uuidv4 } from 'uuid';
import router from "@/router";

const Posttitle = refvue("")
const Postdescr = refvue("")



let file = {};

const chooseFilePost = (e) => {
        file = e.target.files[0]
    }

const CreatePostSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const postId = uuidv4();
    const storageRef  = ref(storage, 'posts/' + postId + '/post.jpg');
    uploadBytes(storageRef, file).then(() => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(ref(storage, 'posts/' + postId + '/post.jpg'))
    .then(async (url) => {
            try {
        const docRef = await addDoc(collection(db, "posts"), {
        title: Posttitle.value,
        descr: Postdescr.value,
        author: user.displayName,
        UserId: user.uid,
        img: url,
        imgId: postId,
        timestamp: -(+new Date()),
        type: 'image'
        });
        console.log("Document written with ID: ", docRef.id);
        router.push("/")
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    })
    });
}

</script>
<style lang="scss" scoped>
.create-post-wrapper{
    h3{
        margin-top: 20px;
        text-align: center;
    }
}
.form-wrapper{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: center;
        margin-top: 20px;
        .form-control{
            width: 90%;
            margin: 8px;
            height: 50px;
        }
        .btn{
            margin: 8px;
            background-color: #8409F9;
            border: 0px;
        }
        .btn:hover{
            background-color: #FFF;
            color: #8409F9;
        }
        .form-file{
            width: 50%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            align-content: center;
        }
        .form-post-txt-data{
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            align-items: center;
        }
    }
</style>