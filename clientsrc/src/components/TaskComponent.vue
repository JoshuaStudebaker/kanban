<template>
  <li>
    {{taskProp.title}}:
    <form class="form-inline" @submit.prevent="createComment">
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
    <button class="btn btn-sm btn-danger" @click="deleteTask(taskProp.id)">Delete</button>
    <ul>
      <comment-component v-for="iComment in comments" :key="iComment.id" :commentProp="iComment" />
    </ul>
  </li>
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
    };
  },
  mounted() {
    this.$store.dispatch("getCommentsByTaskId", this.taskProp.id);
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp.id];
    },
  },
  methods: {
    createComment() {
      let payload = {
        title: this.newComment.title,
        taskId: this.taskProp.id,
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
  },
};
</script>

<style scoped>
</style>
