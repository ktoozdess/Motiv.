<template>
    <div class="create-post-wrapper animate__animated animate__fadeIn ">
        <h3>Create New Quote Post</h3>
        <div class="form-wrapper">
            <div class="form-post-txt-data">
                <input type="text" id="title" placeholder="Quote" v-model="Postquotequote" class="form-control">
                <input type="text" id="quoteauthor" placeholder="Author of Quote" v-model="Postquoteauthor" class="form-control">
                <input type="text" id="descr" placeholder="Descriptions" v-model="Postquotedescr" class="form-control">
                <button @click="CreatePostSubmit" class="btn btn-secondary">Save!</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebase";
import { ref as refvue } from "vue";
import router from "@/router";

const Postquotequote = refvue("")
const Postquoteauthor = refvue("")
const Postquotedescr = refvue("")


const CreatePostSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

            try {
        const docRef = await addDoc(collection(db, "posts"), {
            title: Postquotequote.value,
            descr: Postquotedescr.value,
            author: user.displayName,
            quoteauthor: Postquoteauthor.value,
            UserId: user.uid,
            timestamp: -(+new Date()),
            type: 'quote'
        });
        console.log("Document written with ID: ", docRef.id);
        router.push("/")
        } catch (e) {
        console.error("Error adding document: ", e);
        }
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