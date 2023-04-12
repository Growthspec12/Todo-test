<template>
  <app-dropdown :options="options"></app-dropdown>

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
      options: ["All", "Completed", "Uncompleted", "Favorites"]
    }
  }
}
</script>

<style scoped>

</style>
