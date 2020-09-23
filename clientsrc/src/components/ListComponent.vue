<template>
  <div class="list-component col-12 my-3">
    <div class="card card-style m-2">
      <div class="card-header">
        <h5 class="card-title">{{ listProp.title }}</h5>
        <form class="form-inline" @submit.prevent="editList(listProp.id)">
          <input
            type="text"
            class="form-control"
            placeholder="New List Title..."
            aria-describedby="helpId"
            v-model="editedList.title"
          />
          <button type="submit" class="btn btn-warning">Edit List</button>
        </form>
        <button class="btn btn-sm btn-danger" @click="deleteList(listProp.id)">Delete</button>
      </div>
      <div class="card-body shadow">
        <ul class="card-text card-body-style">
          <task-component v-for="iTask in tasks" :key="iTask.id" :taskProp="iTask" />
        </ul>
        <div class="card-footer">
          <form class="form-inline" @submit.prevent="createTask">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="newTask.title"
                placeholder="Enter here..."
                required
              />
            </div>
            <button type="submit" class="btn btn-success mx-3">Add Task</button>
          </form>
        </div>
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
</style>
