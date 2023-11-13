<template>
  <h1 id="title">Search profile github</h1>
  <form action="" id="form" @submit.prevent="searchProfile">
    <input id="formInput" type="text" placeholder="Search" v-model="locaNameProfile" />
    <button id="formButton">Search</button>
  </form>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      locaNameProfile: "",
    }
  },
  methods: {
    async searchProfile() {
      if (this.locaNameProfile === "") {
        return;
      }
      
      this.$emit("search-profile", this.locaNameProfile);
    },
  },
  emits: ["searchProfile"]
};
</script>

<style lang="scss" scoped>
#title {
  margin: 0 auto;
  padding: 0 0 2rem 0;
  color: $white;
  text-align: center;
  font-size: 3rem;
}

#form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 40rem;
  
  #formInput, #formButton {
    border-radius: .5rem;
    border: none;
  }

  #formInput {
    outline: none;
    padding: 0 1.5rem;
    caret-color: $green;
    height: 3rem;
    width: 33rem;
  }

  #formButton {
    background-color: $green;
    cursor: pointer;
    height: 3rem;
    width: 5rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken($green, 10%);
    }

    &:active {
      background-color: darken($green, 20%);
    }
  }
}
</style>
