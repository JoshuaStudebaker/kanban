<template>
  <div class="boards container-fluid d-flex flex-column justify-content-center">
    <div class="row">
      <h1 class="card offset-4 col-4 text-dark see-through border-success">Welcome to your boards!</h1>
    </div>
    <div class="row">
      <div class="card offset-4 col-4 my-2 p-1 border-success see-through">
      <form class="form-inline" @submit.prevent="addBoard">
        <input class="form-control mx-2" type="text" placeholder="New Board Title" v-model="newBoard.title" required />
        <input class="form-control mx-2" type="text" placeholder="New Board Description" v-model="newBoard.description" />
        <button class="btn btn-success" type="submit">Create Board</button>
      </form>
      </div>
    </div>
    <div class="row">
    <div class="card offset-4 col-4 mt-2 border-success see-through" v-for="board in boards" :key="board.id">
      <h1 class="mt-2"><router-link class="text-dark" :to="{name: 'board', params: {boardId: board.id}}">{{board.title}}</router-link></h1>
        <div class="card-body">
          <button class="btn btn-danger" @click="deleteBoard(board.id)">Delete</button>
        </div>
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

<style>
.boards{
    background-image: url("~@/assets/imgs/sand.jpg");
    background-position: center;
    background-size: cover;
    height: 100vh;
  }

  .text-shadow{
    text-shadow: 1px 1px #030303
  }
  .see-through{
    background-color: hsla(218, 19%, 89%, 0.75);
  }
</style>