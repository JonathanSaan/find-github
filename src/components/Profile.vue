<template>
  <div id="profile">
    <img id="profileImage" :src="data.avatar_url" alt="profile image" />
    <h1 id="profileTitle">{{ data.login }}</h1>
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
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      data: {},
    }
  },
  methods: {
    async getProfileData() {
      const data = await axios.get(`https://api.github.com/users/${this.nameProfile}`)
      this.data = data.data;
      console.log(data)
    },
  },
  props: {
    nameProfile: String,
  },
  mounted() {
    this.getProfileData();
  },
};
</script>

<style lang="scss" scoped>
#profile {
  display: flex;
  flex-direction: column;
  margin: 3rem 4% 0 4%;
  height: 30rem;
  width: 30rem;
  align-items: center;
  color: $white;

  #profileImage {
    margin: 0 0 2rem 0;
    border-radius: 50%;
    height: 15rem;
    width: 15rem;
  }

  #profileTitle {
    font-size: 2rem;
  }

  #profileBio {
    margin: .5rem 0 1rem 0;
    font-size: .8rem;
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
        border-left: .1rem solid $green;
        border-right: .1rem solid $green;
      }

      .profile_listNumber {
        font-size: 2rem;
        font-weight: 900;
      }
      .profile_listName {
        font-size: .8rem;
        font-weight: Thin;
      }
    }
  }
}
</style>
