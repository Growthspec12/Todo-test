<template>
  <div class="page-container">
    <header class="header">
      <nav class="navbar">
        <h1 class="navbar__heading">{{ user.name }}</h1>
        <ul class="navbar__list">
          <li class="navbar__li">{{ user.address.city }}</li>
          <li class="navbar__li">{{ user.phone }}</li>
          <li class="navbar__li">{{ user.company.name }}</li>
          <li class="navbar__li">{{ user.email }}</li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import AppDropdown from "@/components/AppDropdown";
export default {
  name: "PageTodo",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    AppDropdown
  },
  data(){
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
