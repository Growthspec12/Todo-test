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
    <div class="input-bar" data-app>
      <div class="input-bar__item">
        <v-select
          v-model="selectedStatusOptions"
          :items="statusOptions"
          label="Status filter"
          :dark="true"
          multiple
        >
          <template v-slot:prepend-item>
            <v-list-item
              ripple
              @mousedown.prevent
              @click="toggleAllStatus"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Select All
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <div class="input-bar__item">
        <v-select
          v-model="selectedIdOptions"
          :items="idOptions"
          label="Id filter"
          :dark="true"
          multiple
        >
          <template v-slot:prepend-item>
            <v-list-item
              ripple
              @mousedown.prevent
              @click="toggleAllId"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Select All
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-select>
      </div>
      <div class="input-bar__item">
          <input type="text" class="form__input form__input_item" placeholder="Filter by title" v-model="titleInput">
      </div>
    </div>
    <div class="todos">
      <v-card
        max-width="600"
        class="mx-auto"
      >
        <v-list
          subheader
          two-line
          flat
        >
          <v-list-item-group multiple>
            <v-list-item v-for="todo in filteredTodo" :key="todo.id">
              <v-list-item-action>
                <v-checkbox
                  :input-value="todo.completed"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>User ID: {{ todo.userId }}</v-list-item-title>
                <v-list-item-subtitle>{{ todo.title }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>

    <div class="create-todo">
      <div class="wrapper">
        <form class="form" @submit.prevent="addTodo">
          <input type="text" class="form__input" placeholder="Enter user ID" v-model="userIdInput">
          <input type="text" class="form__input" placeholder="Enter todo title" v-model="todoTitleInput">
          <button type="submit" class="form__button">Add todo</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {createTodo, getTodos} from "@/api/todo";

export default {
  name: "PageTodo",
  props: {
    user: {
      type: Object,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      statusOptions: [
        'Selected',
        'Unselected',
        'Favorites',
      ],
      idOptions: [],
      selectedStatusOptions: [],
      selectedIdOptions: [],
      allTodo: [],
      filteredTodo: [],
      titleInput: "",
      userIdInput: "",
      todoTitleInput: ""
    }
  },
  computed: {
    isAllStatusOptions () {
      return this.selectedStatusOptions.length === this.statusOptions.length
    },
    isAllIdOptions () {
      return this.selectedIdOptions.length === this.idOptions.length
    },
    filterTodo(){
      return this.allTodo.filter(todo => {
        let statusFilter = false;
        let userFilter = false;
        let inputMatch = false;

        if (this.selectedStatusOptions.length === 0 || this.selectedStatusOptions.includes('Selected') && todo.completed || this.selectedStatusOptions.includes('Unselected') && !todo.completed || this.selectedStatusOptions.includes('Favorites') && todo.favorite) {
          statusFilter = true;
        }

        if (this.selectedIdOptions.length === 0 || this.selectedIdOptions.includes(todo.userId)) {
          userFilter = true;
        }

        if (todo.title.includes(this.titleInput)){
          inputMatch = true;
        }

        return statusFilter && userFilter && inputMatch;
      });
    }
  },
  watch: {
    selectedStatusOptions(){
      this.filteredTodo = this.filterTodo
    },
    selectedIdOptions(){
      this.filteredTodo = this.filterTodo
    },
    titleInput(){
      this.filteredTodo = this.filterTodo
    }
  },
  methods: {
    async initTodo(){
      try {
        const response = await getTodos();
        this.allTodo = await response.json();
        this.allTodo = this.allTodo.map(todo => {
          return {...todo, isFavorite: false}
        })
        this.filteredTodo = this.allTodo
      } catch {
        console.log("Can't load todo data")
      }
    },
    toggleAllStatus () {
      if (this.isAllStatusOptions){
        this.selectedStatusOptions = []
        return;
      }
      this.selectedStatusOptions = this.statusOptions;
    },
    toggleAllId () {
      if (this.isAllIdOptions){
        this.selectedIdOptions = []
        return;
      }
      this.selectedIdOptions = this.idOptions
    },
    async addTodo(){
      try {
        const response = await createTodo({
          userId: this.userIdInput,
          title: this.todoTitleInput
        });
        if (response.ok){
          this.allTodo.push({
            id: new Date().toISOString(),
            userId: this.userIdInput,
            title: this.todoTitleInput,
            completed: false,
            isFavorite: false
          })
          this.userIdInput = ""
          this.todoTitleInput = ""
        }
      } catch {
        console.log("Can't create todo")
      }
    }
  },
  created(){
    this.initTodo()
    this.idOptions = this.users.map(user => user.id)
  }
}
</script>

<style lang="scss" scoped>
.form__input{
  margin-bottom: 5px;
}
.v-list-item{
  &__title{
    margin-left: 10px;
  }
  &__subtitle{
    margin-left: 10px;
  }
}
.wrapper{
  width: 100%;
  max-width: 450px;
}
</style>
