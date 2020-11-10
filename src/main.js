import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./router.js";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import infiniteScroll from "vue-infinite-scroll";
import VueObserveVisibility from "vue-observe-visibility";
Vue.use(infiniteScroll);
Vue.use(VueObserveVisibility);
Vue.use(VueRouter);

Vue.config.productionTip = false;

var firebaseConfig = {
    apiKey: "AIzaSyCSfVJoEnJMjYPzjzf1ePolWQetHGn8cl8",
    authDomain: "newsapp-d4772.firebaseapp.com",
    databaseURL: "https://newsapp-d4772.firebaseio.com",
    projectId: "newsapp-d4772",
    storageBucket: "newsapp-d4772.appspot.com",
    messagingSenderId: "364554147764",
    appId: "1:364554147764:web:3e57a4ed5b0ff75f4a84e1",
    measurementId: "G-4P4ZS92R7Z",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const router = new VueRouter({
    routes: Routes,
    mode: "history",
    base: process.env.BASE_URL,

    //   default mode is "hash"
});
router.beforeEach((to, from, next) => {
    /* It will change the title when the router is changed */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

new Vue({
    vuetify,
    AOS,
    render: (h) => h(App),
    router: router,
}).$mount("#app");