<template>
  <div id="profile" v-show="nameProfile && data && !loading">
    <img id="profileImage" :src="data.avatar_url" alt="profile image" />
    <a id="profileTitle" :href="data.html_url" target="_blank" rel="noopener noreferrer">
      {{ data.login }}
    </a>
    <h2 id="profileBio">{{ data.bio }}</h2>

    <div id="profile_lists">
      <div class="profile_list">
        <h2 class="profile_listNumber">{{ data.public_repos }}</h2>
        <h3 class="profile_listName">repository</h3>
      </div>
      <div class="profile_list">
        <h2 class="profile_listNumber">{{ data.following }}</h2>
        <h3 class="profile_listName">following</h3>
      </div>
      <div class="profile_list">
        <h2 class="profile_listNumber">{{ data.followers }}</h2>
        <h3 class="profile_listName">followers</h3>
      </div>
    </div>
  </div>
  <div id="loading" v-show="nameProfile && data && loading">
    <svg id="loadingIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#2ECC71"></stop><stop offset=".3" stop-color="#2ECC71" stop-opacity=".9"></stop><stop offset=".6" stop-color="#2ECC71" stop-opacity=".6"></stop><stop offset=".8" stop-color="#2ECC71" stop-opacity=".3"></stop><stop offset="1" stop-color="#2ECC71" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1.3" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#2ECC71" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
  </div>
  <div id="noprofile" v-show="nameProfile && !data && !loading">
    <h1>Profile not found.</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      data: {},
      loading: false,
      fadeIn: false,
    };
  },
  methods: {
    async getProfileData() {
      this.loading = true;
      this.fadeIn = false;
      try {
        const response = await axios.get(`https://api.github.com/users/${this.nameProfile}`);
        this.data = response.data;
        console.log(response.data)
      } catch (error) {
        console.error(`Error fetching profile data for ${this.nameProfile}:`, error);
        this.data = "";
      } finally {
        this.fadeIn = true;
        this.loading = false;
      }
    },
  },
  props: {
    nameProfile: String,
  },
  watch: {
    nameProfile: "getProfileData",
  },
  mounted() {
    this.getProfileData();
  },
};
</script>

<style lang="scss" scoped>
@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#profile {
  display: flex;
  flex-direction: column;
  margin: 2.5rem 4% 0 4%;
  height: 30rem;
  width: 30rem;
  align-items: center;
  opacity: 0;
  animation: fadeInAnimation 1.3s ease-in-out forwards;
  color: $white;

  #profileImage {
    margin: 0 0 2rem 0;
    border-radius: 50%;
    height: 15rem;
    width: 15rem;
  }

  #profileTitle {
    text-decoration: none;
    color: $white;
    font-size: 2rem;
  }

  #profileBio {
    margin: 0.5rem 0 1rem 0;
    font-size: 0.8rem;
  }

  #profile_lists {
    display: flex;
    margin: auto 0 0 0;
    height: 5rem;
    width: 100%;

    .profile_list {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      width: 100%;

      &:nth-child(2n) {
        border-left: 0.1rem solid $green;
        border-right: 0.1rem solid $green;
      }

      .profile_listNumber {
        font-size: 2rem;
        font-weight: 900;
      }
      .profile_listName {
        font-size: 0.8rem;
        font-weight: Thin;
      }
    }
  }
}

#loading {
  color: $white;
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  #loadingIcon {
    width: 4rem;
  }
}

#noprofile {
  display: flex;
  justify-content: center;
  color: $white;
  font-size: 2.3rem;
  margin: 6rem 0 0 0;
}
</style>
