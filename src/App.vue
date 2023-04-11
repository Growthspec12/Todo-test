<template>
  <div class="container">
    <page-login v-if="!isLoggedIn"></page-login>
    <page-todo v-else></page-todo>
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
      isLoggedIn: false
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
