<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="https://image.freepik.com/free-vector/bloggers-advertising-referrals-young-people-with-gadgets-loudspeakers-announcing-news-attracting-target-audience-vector-illustration-marketing-promotion-communication_74855-8244.jpg"
          contain
          height="350"
        />
      </v-col>

      <v-col>
        <h2 class="display-2 font-weight-bold">
          Enter NewsApp
        </h2>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="10" md="10" sm="10" lg="5">
            <v-text-field label="Email" v-model="user.email"></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="10" md="10" sm="10" lg="5">
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              class="input-group--focused"
              @click:append="show = !show"
              label="Password"
              v-model="user.password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="10" md="10" sm="10" lg="5">
            <v-btn block color="primary" @click.prevent="userLogin">
              Login
            </v-btn>
          </v-col>
          <v-col cols="12">
            Don't have an account?
            <router-link :to="{ name: 'register' }">Register</router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",

  data: () => ({
    show: false,
    user: {
      email: "",
      password: "",
    },
  }),
  mounted() {
    this.autoFill();
    this.sessionAuth();
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          var status = "loggedIn";
          localStorage.setItem("loggedIn", status);
          localStorage.setItem("email", this.user.email);
          localStorage.setItem("pass", this.user.password);
        })
        .then(() => {
          this.$router.push("/news");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    autoFill() {
      if (localStorage.getItem("email") || localStorage.getItem("pass")) {
        this.user.email = localStorage.getItem("email");
        this.user.password = localStorage.getItem("pass");
      }
    },
    sessionAuth() {
      if (localStorage.getItem("loggedIn")) {
        this.$router.push("/news");
      }
    },
  },
};
</script>
