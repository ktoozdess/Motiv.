import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/quotes',
    name: 'quotes',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuotesView.vue'),
    meta:{
      requiresAuth: true,
    }
  },

  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signin',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUpView.vue')
  },
  {
    path: '/feed',
    name: 'FeedView',
    component: () => import(/* webpackChunkName: "about" */ '../views/FeedView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/updateprofile',
    name: 'UpdateProfileDataView',
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateProfileDataView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/post/:id',
    name: 'PostView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/quote/:id',
    name: 'QuoteView',
    component: () => import(/* webpackChunkName: "about" */ '../views/QuoteView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/createpostphoto',
    name: 'CreatePostView',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreatePostView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/createpostquote',
    name: 'CreateQuoteView',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateQuoteView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/profile/:id',
    name: 'ProfileUserView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileUserView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

  const getCurrentUser = () => {
    return new Promise ((resolve, reject) => {
        const removeListener = onAuthStateChanged(
          getAuth(),
          (user) => {
            removeListener();
            resolve(user);
          },
          reject
        )
    })
  }

  router.beforeEach(async (to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)){
      if(await getCurrentUser()){
        next()
      }
      else{
        alert("You don't have access")
        next("/signin")
      }
    }else{
      next()
    }
  });

export default router
