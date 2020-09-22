<template>
  <li>
    {{taskProp.title}}
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
    return {};
  },
  mounted() {
    this.$store.dispatch("getCommentsByTaskId", this.taskProp.id);
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskProp.id];
    },
  },
};
</script>

<style scoped>
</style>
