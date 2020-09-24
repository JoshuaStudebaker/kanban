<template>
  <div class="home d-flex flex-column justify-content-center">
    <h1 class="text-light ">Welcome to your Home Page</h1>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
  .home{
    background-image: url("~@/assets/imgs/ocean.jpg");
    background-position: center;
    background-size: cover;
    height: 100vh;
  }
</style>