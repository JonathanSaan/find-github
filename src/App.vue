<template>
  <div class="flex flex-col min-h-screen pt-12 pb-8 bg-stone-950 max-md:px-8 max-lg:px-40 max-lg:py-12">
    <Search :queryName="queryName" @search-profile="searchProfile" />
    <main class="flex justify-between lg:px-16 my-auto max-lg:m-0 max-lg:py-12 max-lg:min-h-[50rem] max-lg:h-[50vh] max-lg:flex-col">
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