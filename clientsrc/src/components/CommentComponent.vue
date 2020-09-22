<template>
  <li class="border">
    <form class="form-inline" @submit.prevent="editComment(commentProp.id)">
          <input
            type="text"
            class="form-control"
            placeholder="New Comment Title..."
            aria-describedby="helpId"
            v-model="editedComment.title"
          />
          <button type="submit" class="btn btn-warning">Edit Comment</button>
        </form>
    {{commentProp.title}}
    <button class="btn btn-sm btn-danger" @click="deleteComment(commentProp.id)">Delete</button>
  </li>
</template>

<script>
export default {
  name: "comment-component",
  props: ["commentProp"],
  data(){
    return{ editedComment: {} }
  },
  methods: {
    deleteComment(id) {
      let payload = {
        id: id,
        taskId: this.commentProp.taskId,
      };
      this.$store.dispatch("deleteComment", payload);
    },
    editComment(id){
      this.editedComment.id = id
      this.$store.dispatch("editComment", this.editedComment)
    }
  },
};
</script>

<style scoped>
</style>
