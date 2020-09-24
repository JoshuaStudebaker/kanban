<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="card col-12 offset-lg-4 col-lg-4 my-2 see-through">
        <h1 class="text-dark text-shadow" v-if="board.title">
          {{ board.title }}
        </h1>
        <h1 class="text-dark text-shadow" v-else>Loading...</h1>
        <h4 class="text-dark text-shadow">{{ board.description }}</h4>
      </div>
    </div>
    <form class="form-inline mx-3" @submit.prevent="editActiveBoard">
      <input
        type="text"
        class="form-control mx-3"
        placeholder="New Board Title..."
        aria-describedby="helpId"
        v-model="editBoard.title"
      />
      <input
        type="text"
        class="form-control"
        placeholder="New Board Description..."
        aria-describedby="helpId"
        v-model="editBoard.description"
      />
      <button type="submit" class="btn btn-warning mx-3">Edit Board</button>
    </form>
    <form class="form-inline mt-3 mx-3" @submit.prevent="createList">
      <div class="form-inline mx-3">
        <input
          type="text"
          class="form-control"
          v-model="newList.title"
          placeholder="New List..."
          required
        />
      </div>
      <button type="submit" class="btn btn-success">Add List</button>
    </form>
    <div class="row">
      <list-component
        v-for="iList in lists"
        :key="iList.id"
        :listProp="iList"
      />
    </div>
  </div>
</template>

<script>
import listComponent from "../components/ListComponent";
export default {
  name: "board",
  components: {
    listComponent,
  },
  data() {
    return {
      newList: {},
      editBoard: {},
      editList: {},
    };
  },

  props: ["boardId"],
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },

  methods: {
    createList() {
      let payload = {
        title: this.newList.title,
        boardId: this.board.id,
      };
      this.$store.dispatch("createList", payload);
    },
    editActiveBoard() {
      this.$store.dispatch("editBoard", this.editBoard);
    },
  },
};
</script>

<style>
.board {
  background-image: url("~@/assets/imgs/forest.jpg");
  background-position: center;
  background-size: cover;
  min-height: 100vh;
}
.text-shadow {
  text-shadow: 1px 1px #030303;
}
.see-through {
  background-color: hsla(218, 19%, 89%, 0.75);
}
</style>
