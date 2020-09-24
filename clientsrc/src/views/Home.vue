<template>
  <div
    class="home d-flex flex-column justify-content-center align-items-center"
  >
    <router-link class="nav-link" :to="{ name: 'boards' }">
      <h1 class="text-light text-shadow shadow see-through p-2">
        <i class="fas fa-torii-gate"></i> Welcome to your Home Page!
        <i class="fas fa-torii-gate"></i>
      </h1>
    </router-link>
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
  components: {},
};
</script>

<style scoped>
.home {
  background-image: url("~@/assets/imgs/gate.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
}
.text-shadow {
  text-shadow: 1.5px 1.5px 4px #030303;
}
.see-through {
  background-color: hsla(218, 19%, 89%, 0.75);
}

h1 {
  cursor: pointer;
}
</style>
