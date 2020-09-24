<template>
  <div class="boards container fluid">
    <h1>Welcome to your boards!</h1>
    <div class="card">
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>
    </div>
    <div class="card" v-for="board in boards" :key="board.id">
      <h3><router-link :to="{name: 'board', params: {boardId: board.id}}">Board Name: {{board.title}}</router-link></h3>
        <div class="card-body">
          <button class="btn btn-danger" @click="deleteBoard(board.id)">Delete</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(id) {
      this.$store.dispatch("deleteBoard", id);
    },
  },
};
</script>