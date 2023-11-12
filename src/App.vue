<template>
  <div id="container">
    <Search />
    <Profile />
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
  min-height: 100vh;
  background-color: $background;

  h1 {
    color: $white;
  }
}
</style>
