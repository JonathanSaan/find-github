<template>
  <div id="container">
    <Search :queryName="queryName" @search-profile="searchProfile" />
    <main id="containerMain">
      <Profile :queryName="queryName" :dataProfile="dataProfile" :loading="loading" @get-profile-data="getProfileData" />
      <Dashboard :queryName="queryName" :dataProfile="dataProfile" :dataDashboard="dataDashboard" :loading="loading" @get-profile-data="getProfileData" />
    </main>
  </div>
</template>

<script>
import axios from "axios";

import Search from "./components/Search.vue";
import Profile from "./components/Profile.vue";
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Search,
    Profile,
    Dashboard,
  },
  data() {
    return {
      dataProfile: {},
      dataDashboard: {},
      queryName: "",
      loading: false,
      fadeIn: false,
      githubToken: process.env.VUE_APP_GITHUB_TOKEN,
    };
  },
  methods: {
    searchProfile(newName) {
      this.queryName = newName;
    },
    async getProfileData() {
      this.loading = true;
      this.fadeIn = false;

      try {
        const [responseProfile, responseDashboard] = await Promise.all([
          axios.get(`https://api.github.com/users/${this.queryName}`, {headers: { Authorization: `Bearer ${this.githubToken}` }}),
          axios.get(`https://api.github.com/users/${this.queryName}/events?per_page=100`, { headers: { Authorization: `Bearer ${this.githubToken}` }}),
        ]);
        
        this.dataProfile = responseProfile.data;
        this.dataDashboard = responseDashboard.data;
      } catch (error) {
        this.dataProfile = {};
        this.dataDashboard = {};
      } finally {
        this.fadeIn = true;
        this.loading = false;
      }
    },
  },
  watch: {
    queryName: "getProfileData",
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

html {
  background-color: $background;
}



#container {
  display: flex;
  flex-direction: column;
  padding: 3rem 0 2rem 0;
  min-height: 100vh;
  height: auto;

  #containerMain {
    display: flex;
    justify-content: space-between;
    margin: auto 0;
    padding: 0 5vw;
  }
}

@media screen and (max-width: 1006px) {
  #container {
    padding: 3rem 2rem;

    #containerMain {
      justify-content: space-between;
      margin: 0;
      padding: 3rem 0;
      min-height: 50rem;
      height: 50vh;
      flex-direction: column;
    }
  }
}
</style>
