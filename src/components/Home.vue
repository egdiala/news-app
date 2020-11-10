<template>
  <div>
    <v-row>
      <v-col class="text-center" cols="4">
        <v-btn class="ma-2" color="indigo" @click="cardView()" dark>
          Card View
          <v-icon dark>
            mdi-view-agenda
          </v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="4">
        <v-btn class="ma-2" color="indigo" @click="listView()" dark>
          List View
          <v-icon dark>
            mdi-view-list
          </v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="4">
        <v-btn class="ma-2" color="indigo" @click="logOut()" dark>
          Logout
          <v-icon>
            mdi-logout
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="view == 'card'"
        cols="12"
        v-infinite-scroll="getData"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="limit"
      >
        <v-card
          class="mx-auto mb-4"
          max-width="400"
          v-for="(post, i) in news"
          :key="i"
          data-aos="slide-up"
          data-aos-offset="100"
          data-aos-easing="ease-out-back"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="post.urlToImage"
          >
            <v-card-title>{{ post.title }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ post.author }}</div>

            <div>{{ post.content }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" :href="post.url" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        v-else-if="view == 'list'"
        cols="12"
        v-infinite-scroll="getData"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="limit"
      >
        <v-list three-line>
          <template v-for="(post, index) in news" @click="goTo(post.url)">
            <v-subheader
              v-if="post.header"
              :key="post.header"
              v-text="post.header"
            ></v-subheader>

            <v-divider
              v-else-if="post.divider"
              :key="index"
              :inset="post.inset"
            ></v-divider>

            <v-list-item v-else :key="post.title">
              <v-list-item-avatar>
                <v-img :src="post.urlToImage"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="post.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="post.content"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import AOS from "aos";
import firebase from "firebase";

export default {
  name: "Home",

  data: () => ({
    show: false,
    news: [],
    persons: [],
    limit: 100,
    scrolledToBottom: false,
    page: 1,
    busy: false,
    view: "card",
  }),
  methods: {
    getData() {
      this.busy = true;
      var page = this.page;
      axios
        .get(
          `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=b5bbec5c1345473ba3e88d085f05f897&page=${page}`
        )
        .then((res) => {
          const append = res.data.articles.slice(
            this.news.length,
            this.news.length + this.limit
          );
          this.news = this.news.concat(append);
          this.busy = false;
        });
    },
    cardView() {
      this.view = "card";
    },
    listView() {
      this.view = "list";
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.busy = false;
      }, 1000);
    },
    sessionAuth() {
      if (!localStorage.getItem("loggedIn")) {
        this.$router.push("/");
      }
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.isActive = false;
            localStorage.removeItem("loggedIn");
            this.$router.push("/");
          });
        });
    },
    goTo(url) {
      window.location.href = url;
    },
  },
  created() {
    this.getData();
    this.sessionAuth();
  },
};
AOS.init();
</script>
