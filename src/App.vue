<template>
  <div id="container">
    <Search :nameProfile="nameProfile" @search-profile="searchProfile" />
    <Profile :nameProfile="nameProfile" />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Profile from "./components/Profile.vue";

export default {
  name: "App",
  components: {
    Search,
    Profile,
  },
  data() {
    return {
      nameProfile: "",
    }
  },
  methods: {
    searchProfile(newName) {
      this.nameProfile = newName;
    },
  },
};
</script>

<style lang="scss">
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

#container {
  padding: 2rem 0;
  min-height: 100vh;
  background-color: $background;
}
</style>
