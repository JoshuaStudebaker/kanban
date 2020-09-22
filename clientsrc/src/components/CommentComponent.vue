<template>
  <li>
    {{commentProp.title}}
    <button class="btn btn-sm btn-danger" @click="deleteComment(commentProp.id)">Delete</button>
  </li>
</template>

<script>
export default {
  name: "comment-component",
  props: ["commentProp"],
  methods: {
    deleteComment(id) {
      let payload = {
        id: id,
        taskId: this.commentProp.taskId,
      };
      this.$store.dispatch("deleteComment", payload);
    },
  },
};
</script>

<style scoped>
</style>
