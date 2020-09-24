<template>
  <div class="border col-12 card">
    <div class="card-body">
    <h6 class='mt-2'>{{taskProp.title}} <button class="btn btn-sm btn-danger" @click="deleteTask(taskProp.id)">Delete</button></h6>
    <form class="form-inline my-2" @submit.prevent="editTask(taskProp.id)">
      <input
        type="text"
        class="form-control mr-2"
        placeholder="New Task Title..."
        aria-describedby="helpId"
        v-model="editedTask.title"
      />
      <div class="form-group">
        <label for="exampleFormControlSelect2">Choose a list:</label>
        <select class="form-control mx-2" id="exampleFormControlSelect2" v-model="editedTask.listId">
          <option v-for="iList in lists" :key="iList.id" :value="iList.id">{{iList.title}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-warning">Edit Task</button>
    </form>
    <form class="form-inline my-2" @submit.prevent="createComment">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="newComment.title"
          placeholder="Enter here..."
          required
        />
      </div>
      <button type="submit" class="btn btn-success mx-3">Add Comment</button>
    </form>
    </div>
    <div>
      <comment-component v-for="iComment in comments" :key="iComment.id" :commentProp="iComment" />
    </div>
  </div>
</template>

<script>
import commentComponent from "./CommentComponent";
export default {
  name: "task-component",
  props: ["taskProp"],
  components: {
    commentComponent,
  },
  data() {
    return {
      newComment: {},
      editedTask: {},
    };
  },
  mounted() {
    this.$store.dispatch("getCommentsByTaskId", this.taskProp.id);
  },

  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp.id];
    },
    lists() {
      console.log("lists");
      return this.$store.state.lists;
    },
  },
  methods: {
    createComment() {
      let payload = {
        title: this.newComment.title,
        taskId: this.taskProp.id,
        boardId: this.taskProp.boardId,
        listId: this.taskProp.listId,
      };
      this.$store.dispatch("createComment", payload);
    },
    deleteTask(id) {
      let payload = {
        id: id,
        listId: this.taskProp.listId,
      };
      this.$store.dispatch("deleteTask", payload);
    },
    editTask(id) {
      this.editedTask.id = id;
      this.editedTask.oldId = this.taskProp.listId;
      this.$store.dispatch("editTask", this.editedTask);
    },
  },
};
</script>

<style scoped>

</style>
