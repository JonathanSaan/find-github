<template>
  <div class="flex flex-col max-lg:mx-auto max-lg:mb-16 h-[30rem] max-lg:h-auto w-[30rem] max-lg:w-[25rem] items-center opacity-0 text-white animate-fadeIn" v-show="queryName && dataProfile.login && !loading">
    <img class="rounded-full mb-8 h-60 w-60" :src="dataProfile ? dataProfile.avatar_url : null" alt="profile image" draggable="false" />
    <a class="no-underline text-white text-[2rem]" :href="dataProfile.html_url" target="_blank" rel="noopener noreferrer">
      {{ dataProfile.login }}
    </a>
    <h2 class="mt-2 mb-4 text-[.8rem]">{{ dataProfile.bio }}</h2>

    <div class="flex mt-auto h-[5rem] w-full">
      <div class="flex items-center justify-center flex-col text-center w-full">
        <h2 class="select-none h-[2.7rem] text-[2rem] font-black">{{ dataProfile.public_repos ? dataProfile.public_repos : 0 }}</h2>
        <p class="text-[.8rem]">repository</p>
      </div>
      <div class="flex items-center justify-center flex-col text-center w-full border-l-[.1rem] border-r-[.1rem] border-solid border-green-500">
        <h2 class="select-none h-[2.7rem] text-[2rem] font-black">{{ dataProfile.following ? dataProfile.following : 0 }}</h2>
        <p class="text-[.8rem]">following</p>
      </div>
      <div class="flex items-center justify-center flex-col text-center w-full">
        <h2 class="select-none h-[2.7rem] text-[2rem] font-black">{{ dataProfile.followers ? dataProfile.followers : 0 }}</h2>
        <p class="text-[.8rem]">followers</p>
      </div>
    </div>
  </div>
  <div class="flex text-white h-[30rem] w-full text-[2rem] max-lg:text-[text-2xl] justify-center items-center" v-show="queryName && dataProfile.login && loading">
    <svg class="w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#2ECC71"></stop><stop offset=".3" stop-color="#2ECC71" stop-opacity=".9"></stop><stop offset=".6" stop-color="#2ECC71" stop-opacity=".6"></stop><stop offset=".8" stop-color="#2ECC71" stop-opacity=".3"></stop><stop offset="1" stop-color="#2ECC71" stop-opacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" stroke-width="20" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1.3" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transform-origin="center" fill="none" opacity=".2" stroke="#2ECC71" stroke-width="20" stroke-linecap="round" cx="100" cy="100" r="70"></circle></svg>
  </div>
  <div class="flex text-white h-[30rem] w-full text-[2rem] max-lg:text-[text-2xl] justify-center items-center" v-show="queryName && !dataProfile.login && !loading">
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