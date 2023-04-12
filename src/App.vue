<template>
  <div class="wrapper">
    <router-view @login-success="onLoginSuccess" :user="userData" :users="allUsers"></router-view>
  </div>
</template>

<script>

import { setItem } from "@/helper/storage";

export default {
  name: 'App',
  data(){
    return{
      userData: {},
      allUsers: []
    }
  },
  methods: {
    onLoginSuccess(user, users){
      this.userData = user
      this.allUsers = users
      setItem("isLoggedIn", true)
    }
  },
  beforeCreate(){
    setItem("isLoggedIn", false)
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
