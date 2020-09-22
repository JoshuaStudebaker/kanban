<template>
  <div class="board">
    <form class="form-inline" @submit.prevent="createList">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="newList.title"
          placeholder="Enter here..."
          required
        />
      </div>
      <button type="submit" class="btn btn-success mx-3">Add List</button>
    </form>
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <h4>{{board.description}}</h4>
    <form class="form-inline" @submit.prevent="editActiveBoard">
          <input
            type="text"
            class="form-control"
            placeholder="New Board Title..."
            aria-describedby="helpId"
            v-model="editBoard.title"
          />
          <input
            type="text"
            class="form-control"
            placeholder="Board Description..."
            aria-describedby="helpId"
            v-model="editBoard.description"
          />
          <button type="submit" class="btn btn-warning">Edit Board</button>
        </form>
    <list-component v-for="iList in lists" :key="iList.id" :listProp="iList" />
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
    editActiveBoard(){
      this.$store.dispatch("editBoard",this.editBoard)
    }
  },
};
</script>
