<template>
  <h1 class="pb-8 mx-auto text-5xl text-center text-white max-md:text-[2.3rem]">Search profile github</h1>
  <form action="" class="flex justify-between items-center mx-auto lg:w-[40rem] max-lg:w-full" @submit.prevent="searchProfile">
    <input class="mr-10 px-6 h-12 w-full text-white border focus:border-green-500 rounded-md outline-none bg-stone-950 border-zinc-500 caret-green-500" type="text" placeholder="Search" v-model="locaNameProfile" />
    <button class="w-28 h-12 bg-green-500 border-none rounded-md hover:bg-green-600 active:bg-green-700">Search</button>
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