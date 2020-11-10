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
          Sign Up
        </h2>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="10" md="10" sm="10" lg="5">
            <v-text-field
              label="Username"
              v-model="user.username"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="10" md="10" sm="10" lg="5">
            <v-text-field
              label="Email"
              type="email"
              v-model="user.email"
            ></v-text-field>
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
            <v-btn block color="primary" @click.prevent="userRegistration">
              Register
            </v-btn>
          </v-col>
          <v-col cols="12">
            Already registered?
            <router-link :to="{ name: 'login' }">Login</router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Register",

  data: () => ({
    show: false,
    user: {
      username: "",
      email: "",
      password: "",
    },
  }),
  mounted() {
    this.sessionAuth();
  },
  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.user.name,
            })
            .then(() => {
              this.$router.push("/");
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    sessionAuth() {
      if (localStorage.getItem("loggedIn")) {
        this.$router.push("/news");
      }
    },
  },
};
</script>
