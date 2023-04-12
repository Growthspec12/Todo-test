<template>
  <div class="page">
    <div class="login">
      <header class="login__header">description</header>
      <div class="login__body">
        <p class="login__heading">description</p>
        <form class="login__form form" @submit.prevent="register">
          <input class="form__input" :class="{'form__input_error': !isUsernameCorrect}" type="text" placeholder="Username" v-model="inputName">
          <input class="form__input" :class="{'form__input_error': !isPhoneCorrect}" type="text" placeholder="Phone Number" v-model="inputPhone">
          <button class="form__button" type="submit">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsers } from "@/api/users";

export default {
  name: "PageLogin",
  data(){
    return {
      users: [],
      inputName: "",
      inputPhone: "",
      isUsernameCorrect: true,
      isPhoneCorrect: true
    }
  },
  watch: {
    inputName(){
      const regex = /^[a-zA-Z\s]+$/;
      this.isUsernameCorrect = regex.test(this.inputName);
    },
    inputPhone(){
      const regex = /^[a-zA-Z0-9\s-().]+$/;
      this.isPhoneCorrect = regex.test(this.inputPhone)
    }
  },
  methods: {
    async initUsers(){
      try {
        const response = await getUsers();
        this.users = await response.json()
      } catch {
        console.log("Users")
      }
    },
    register(){
      if (!this.isPhoneCorrect || !this.isUsernameCorrect){
        return;
      }
      const currentUser = this.users.find(user => user.username === this.inputName)
      if (!currentUser){
        console.log("User not found");
        return;
      }
      if (currentUser.phone !== this.inputPhone){
        console.log("Phone are wrong");
        return;
      }
      this.$emit("login-success", currentUser, this.users)
      this.$router.push({name: "todo"})
    }
  },
  created(){
    this.initUsers()
  }
}
</script>

<style lang="scss" scoped>

</style>
