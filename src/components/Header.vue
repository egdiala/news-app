<template>
  <v-app-bar app color="primary" dark>
    <div class="mx-auto">
      <v-toolbar-title>NEWS APP</v-toolbar-title>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  mounted() {
    this.sessionAuth();
  },
  methods: {
    sessionAuth() {
      if (localStorage.getItem("loggedIn")) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
  },
};
</script>
