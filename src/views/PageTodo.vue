<template>
  <div class="page-container">
    <header class="header">
      <nav class="navbar">
        <h1 class="navbar__heading">
          {{ user.name }}
        </h1>
        <ul class="navbar__list">
          <li class="navbar__li">
            {{ user.address.city }}
          </li>
          <li class="navbar__li">
            {{ user.phone }}
          </li>
          <li class="navbar__li">
            {{ user.company.name }}
          </li>
          <li class="navbar__li">
            {{ user.email }}
          </li>
        </ul>
      </nav>
    </header>
    <div
      class="input-bar"
      data-app
    >
      <div class="input-bar__item">
        <v-select
          v-model="selectedStatusOptions"
          :items="statusOptions"
          label="Status filter"
          :dark="true"
          multiple
        >
          <template #prepend-item>
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
          <template #prepend-item>
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
        <input
          v-model="titleInput"
          type="text"
          class="form__input form__input_item"
          placeholder="Filter by title"
        >
      </div>
    </div>
    <div class="todos">
      <v-card>
        <v-list
          subheader
          two-line
          flat
        >
          <v-list-item-group multiple>
            <v-list-item
              v-for="todo in filteredTodo"
              :key="todo.id"
            >
              <v-list-item-action>
                <v-checkbox
                  :input-value="todo.completed"
                  color="primary"
                  @click="changeStatus(todo.id)"
                />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>User ID: {{ todo.userId }}</v-list-item-title>
                <v-list-item-subtitle>{{ todo.title }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action @click="addToFavorites(todo.id)">
                <v-icon
                  v-if="!todo.isFavorite"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="grey lighten-1"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>

    <div class="create-todo">
      <div class="wrapper">
        <form
          class="form"
          @submit.prevent="addTodo"
        >
          <input
            v-model="userIdInput"
            type="number"
            class="form__input"
            placeholder="Enter user ID"
          >
          <input
            v-model="todoTitleInput"
            type="text"
            class="form__input"
            placeholder="Enter todo title"
          >
          <button
            type="submit"
            class="form__button"
          >
            Add todo
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {createTodo, getTodos} from "@/api/todo";
import {getItem, setItem} from "@/helper/storage";

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
        "Selected",
        "Unselected",
        "Favorites",
      ],
      idOptions: [],
      selectedStatusOptions: [],
      selectedIdOptions: [],
      allTodo: [],
      titleInput: "",
      userIdInput: "",
      todoTitleInput: ""
    };
  },
  computed: {
    isAllStatusOptions () {
      return this.selectedStatusOptions.length === this.statusOptions.length;
    },
    isAllIdOptions () {
      return this.selectedIdOptions.length === this.idOptions.length;
    },
    filteredTodo(){
      return this.allTodo.filter(todo => {
        let statusFilter = false;
        let userFilter = false;
        let inputMatch = false;

        if (this.selectedStatusOptions.length === 0 || this.selectedStatusOptions.includes("Selected") && todo.completed || this.selectedStatusOptions.includes("Unselected") && !todo.completed || this.selectedStatusOptions.includes("Favorites") && todo.isFavorite) {
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
  created(){
    if (!getItem("favorites")){
      setItem("favorites", []);
    }
    this.initTodo();
    this.idOptions = this.users.map(user => user.id);
  },
  methods: {
    async initTodo(){
      try {
        const favorites = getItem("favorites");
        const response = await getTodos();
        this.allTodo = await response.json();
        this.allTodo = this.allTodo.map(todo => {
          return {...todo, isFavorite: favorites.includes(todo.id)};
        });
      } catch {
        console.log("Can't load todo data");
      }
    },
    toggleAllStatus () {
      if (this.isAllStatusOptions){
        this.selectedStatusOptions = [];
        return;
      }
      this.selectedStatusOptions = this.statusOptions;
    },
    toggleAllId () {
      if (this.isAllIdOptions){
        this.selectedIdOptions = [];
        return;
      }
      this.selectedIdOptions = this.idOptions;
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
            userId: Number(this.userIdInput),
            title: this.todoTitleInput,
            completed: false,
            isFavorite: false
          });
          const isOld = this.idOptions.some(id => id === Number(this.userIdInput));
          !isOld && this.idOptions.push(Number(this.userIdInput));
          this.userIdInput = "";
          this.todoTitleInput = "";
        }
      } catch {
        console.log("Can't create todo");
      }
    },
    addToFavorites(todoId){
      const favorites = getItem("favorites");
      favorites.push(todoId);
      setItem("favorites", favorites);
      const todo = this.allTodo.find(el => el.id === todoId);
      todo.isFavorite = !todo.isFavorite;
    },
    changeStatus(todoId){
      const todo = this.allTodo.find(el => el.id === todoId);
      todo.completed = !todo.completed;
    }
  }
};
</script>

<style lang="scss" scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button,
input[type='number'] {
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield !important;
}
.form__input{
  margin-bottom: 5px;
}
.v-card{
  width: 100%;
  max-width: 650px;
}
.v-list-item{
  width: 100%;
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
