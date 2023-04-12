<template>
  <div class="container">
    <page-login v-if="!isLoggedIn" @login-success="onLoginSuccess"></page-login>
    <page-todo v-else :user="userData"></page-todo>
  </div>
</template>

<script>
import PageLogin from "@/views/PageLogin";
import PageTodo from "@/views/PageTodo";

export default {
  name: 'App',
  components: {
    PageLogin,
    PageTodo
  },
  data(){
    return{
      isLoggedIn: false,
      userData: {}
    }
  },
  methods: {
    onLoginSuccess(user){
      this.userData = user
      this.isLoggedIn = true
    }
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
