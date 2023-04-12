<template>
  <div class="wrapper">
    <div class="input-bar" @click="showOptions">
      <div class="input-bar__search">{{ selectedOption.optionName }}</div>
      <div class="input-bar__button" @click.stop="toggleOptionsVisibility">
        <div class="input-bar__arrow"></div>
      </div>
    </div>
    <div class="list" v-if="optionsIsVisible">
      <div class="list__options" ref="options">
        <p
          v-for="option in filteredList"
          class="list__option"
          :key="option.id"
          :class="{active: option.isActive === 'active', highlight: option.isActive === 'highlight'}"
          @click="selectOptionByClick(option)"
        >{{ option.optionName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppDropdown",
  props: {
    options: {
      type: Array,
      required: true
    }
  },

  data(){
    return {
      optionsIsVisible: false,
      selectedOption: {},
      filteredList: [],
      counter: 0,
      times: 1,
    }
  },
  mounted(){
    this.filteredList = this.options.map((element, index) => {
      return {id: index, optionName: element, isActive: ""};
    })
    this.filteredList[0].isActive = "active"
    this.selectedOption = this.filteredList[0]
  },
  methods: {
    toggleOptionsVisibility(){
      this.optionsIsVisible = !this.optionsIsVisible
      this.resetHighlight()
      this.counter = 0
    },
    hideOptions(){
      this.optionsIsVisible = false
    },
    showOptions(){
      this.optionsIsVisible = true
      this.resetHighlight()
      this.counter = 0
    },
    selectOptionByClick(option){
      if (this.selectedOption.id !== option.id) {
        this.selectedOption = option
        this.resetActive()
        this.selectedOption.isActive = "active"
        this.hideOptions()
        return;
      }
      this.selectedOption = this.filteredList[0]
      this.resetActive()
    },
    resetHighlight(){
      this.filteredList.forEach(el => {
        if (el.isActive !== "active"){
          el.isActive = ""
        }
      })
    },
    resetActive(){
      this.filteredList.forEach(el => {
        if (el.isActive !== "highlight"){
          el.isActive = ""
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 150px;
  min-height: 300px;
  max-height: fit-content;
}
.input-bar {
  display: flex;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  &__search {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $white;
    height: 40px;
    width: 80%;
    padding: 0 5px;
    font-size: 1rem;
    border: 1px solid $gray;
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &__button {
    width: 20%;
    height: 40px;
    border: 1px solid $gray;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &__arrow {
    border: solid $black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    transform: rotate(45deg);
    padding: 3px;
    transition: all 0.3s ease-out;
  }
}
.list {
  width: 100%;
  height: fit-content;
  border: 1px solid $gray;
  border-radius: 5px;
  &__title {
    position: relative;
    top: 0;
    padding: 15px 10px;
    text-align: center;
    border-bottom: 1.5px solid $gray;
    color: $white;
    font-weight: bold;
  }
  &__options {
    overflow: scroll;
    height: fit-content;
    max-height: 255px;
  }
  &__option {
    color: $white;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    &:hover{
      background-color: darkgray;
      cursor: pointer;
      color: black;
    }
  }
}
.active{
  background-color: gray;
  color: white;
}
.highlight{
  background-color: darkgray;
  color: black;
}
</style>
