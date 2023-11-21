<template>
  <div id="profile" v-show="queryName && dataProfile.login && !loading">
    <img id="profileImage" :src="dataProfile ? dataProfile.avatar_url : null" alt="profile image" draggable="false" />
    <a id="profileTitle" :href="dataProfile.html_url" target="_blank" rel="noopener noreferrer">
      {{ dataProfile.login }}
    </a>
    <h2 id="profileBio">{{ dataProfile.bio }}</h2>

    <div id="profile_lists">
      <div class="profile_list">
        <h2 class="profile_listNumber">{{ dataProfile.public_repos ? dataProfile.public_repos : 0 }}</h2>
        <p class="profile_listName">repository</p>
      </div>
      <div class="profile_list">
        <h2 class="profile_listNumber">{{ dataProfile.following ? dataProfile.following : 0 }}</h2>
        <p class="profile_listName">following</p>
      </div>
      <div class="profile_list">
        <h2 class="profile_listNumber">{{ dataProfile.followers ? dataProfile.followers : 0 }}</h2>
        <p class="profile_listName">followers</p>
      </div>
    </div>
  </div>
  <div id="loading" v-show="queryName && dataProfile.login && loading">
    <svg id="loadingIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#2ECC71"></stop><stop offset=".3" stop-color="#2ECC71" stop-opacity=".9"></stop><stop offset=".6" stop-color="#2ECC71" stop-opacity=".6"></stop><stop offset=".8" stop-color="#2ECC71" stop-opacity=".3"></stop><stop offset="1" stop-color="#2ECC71" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1.3" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#2ECC71" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
  </div>
  <div id="noprofile" v-show="queryName && !dataProfile.login && !loading">
    <h1>Profile not found.</h1>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    queryName: String,
    dataProfile: Object,
    loading: Boolean,
  },
  watch: {
    queryName: "getProfileData",
  },
  emits: ["getProfileData"],
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
        user-select: none;
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

#loading, #noprofile {
  display: flex;
  color: $white;
  height: 30rem;
  width: 100%;
  font-size: 2rem;
  justify-content: center;
  align-items: center;

  #loadingIcon {
    width: 4rem;
  }
}

@media screen and (max-width: 1006px) {
  #profile {
    margin: 0 auto 4rem auto;
    height: 45rem;
    width: 25rem;
  }

  #loading, #noprofile {
    font-size: 1.5rem;
  }
}
</style>
