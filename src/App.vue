<template>
  <div class="wrapper">
    <router-view
      :user="userData"
      :users="allUsers"
      @login-success="onLoginSuccess"
    />
  </div>
</template>

<script>

import { setItem } from "@/helper/storage";

export default {
  name: "App",
  data(){
    return{
      userData: {},
      allUsers: []
    };
  },
  beforeCreate(){
    setItem("isLoggedIn", false);
  },
  methods: {
    onLoginSuccess(user, users){
      this.userData = user;
      this.allUsers = users;
      setItem("isLoggedIn", true);
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
