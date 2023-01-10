<template>
  <div class="home">
    <AllPostsitem :posts="posts" />
  </div>
</template>

<script>
import AllPostsitem from '@/components/AllPostsitem.vue';

export default {
  name: 'HomeView',
  props: ['posts'],
  components: {
    AllPostsitem
  }
}
</script>
