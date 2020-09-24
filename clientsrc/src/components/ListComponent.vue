<template>
  <div class="list-component col-12 col-lg-4 my-3">
    <div class="card card-style m-2">
      <div class="card-header">
        <h5 class="card-title">{{ listProp.title }}<i class="fa fa-trash ml-1 text-danger" @click="deleteList(listProp.id)"></i></h5>
        <i class="fa fa-pencil-alt text-info mb-1" aria-hidden="true" @click="editToggle = !editToggle"></i>
        <form v-if="editToggle" class="form-inline" @submit.prevent="editList(listProp.id)">
          <input
            type="text"
            class="form-control mx-3"
            placeholder="New List Title..."
            aria-describedby="helpId"
            v-model="editedList.title"
          />
          <button type="submit" class="btn btn-warning">Edit List</button>
        </form>
        <form class="form-inline mt-3" @submit.prevent="createTask">
            <div class="form-group">
              <input
                type="text"
                class="form-control mx-3"
                v-model="newTask.title"
                placeholder="Enter here..."
                required
              />
            </div>
            <button type="submit" class="btn btn-success">Add Task</button>
          </form>
        
      </div>
      <div class="card-body shadow row">
          <task-component v-for="iTask in tasks" :key="iTask.id" :taskProp="iTask" />
      </div>
    </div>
  </div>
</template>

<script>
import taskComponent from "./TaskComponent";
export default {
  name: "list-component",
  props: ["listProp"],
  components: {
    taskComponent,
  },
  data() {
    return {
      newTask: {},
      editTask: {},
      editedList: {},
      editToggle: false,
    };
  },
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listProp.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp.id];
    },
  },
  methods: {
    createTask() {
      let payload = {
        title: this.newTask.title,
        listId: this.listProp.id,
        boardId: this.listProp.boardId,
      };
      this.$store.dispatch("createTask", payload);
    },
    deleteList(id) {
      this.$store.dispatch("deleteList", id);
    },
    editList(id) {
      this.editedList.id = id;
      this.$store.dispatch("editList", this.editedList);
      this.editToggle = false;
    },
  },
};
</script>

<style scoped>
.card-style {
  background-color: azure;
  border: 4px solid skyblue;
  box-shadow: 0px 0px 3px 3px cadetblue;
}

.card-body {
  padding: 0.85rem;
}

.card-body-style {
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 1.5rem;
}

.fa:hover{
  cursor: pointer;
}

</style>
