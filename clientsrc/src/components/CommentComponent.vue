<template>
  <div class="border card my-2">
    <h6 class='mt-2'>
    {{commentProp.title}}
    <i class="fa fa-trash ml-1 text-danger" @click="deleteComment(commentProp.id)"></i>
    </h6>
    <i class="fa fa-pencil-alt text-info mb-2" aria-hidden="true" @click="editToggle = !editToggle"></i>
    <form v-if="editToggle" class="form-inline m-2" @submit.prevent="editComment(commentProp.id)">
          <input
            type="text"
            class="form-control"
            placeholder="New Comment Title..."
            aria-describedby="helpId"
            v-model="editedComment.title"
          />
          <button type="submit" class="btn btn-warning mx-2">Edit Comment</button>
        </form>
  </div>
</template>

<script>
export default {
  name: "comment-component",
  props: ["commentProp"],
  data(){
    return{ 
      editedComment: {},
      editToggle: false,
     }
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
      this.editToggle = false
    }
  },
};
</script>

<style>
.fa:hover{
  cursor: pointer;
}

</style>
