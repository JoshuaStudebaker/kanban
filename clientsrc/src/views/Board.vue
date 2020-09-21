<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <h4>{{board.description}}</h4>
  </div>
</template>

<script>
export default {
  name: "board",
  components: {},
  // REVIEW boardId is (probably) being used in the router link in Board.vue
  props: ["boardId"],
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
  },
};
</script>
