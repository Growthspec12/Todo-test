<template>
  <div class="container">
    <router-view @login-success="onLoginSuccess" :user="userData"></router-view>
  </div>
</template>

<script>

import { setItem } from "@/helper/storage";

export default {
  name: 'App',
  data(){
    return{
      userData: {}
    }
  },
  methods: {
    onLoginSuccess(user){
      this.userData = user
      setItem("isLoggedIn", true)
    }
  },
  created(){
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
