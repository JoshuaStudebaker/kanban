<template>
  <div class="list-component col-md-4 my-3">
    <div class="card card-style m-2" style="height: 25rem">
      <div class="card-header" style="height: 5rem">
        <h5 class="card-title">{{ listProp.title }}</h5>
      </div>
      <div class="card-body shadow">
        <ul class="card-text card-body-style">
          <task-component v-for="iTask in tasks" :key="iTask.id" :taskProp="iTask" />
        </ul>
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
    return {};
  },
  mounted() {
    console.log("does listProp work?", this.listProp.id);
    this.$store.dispatch("getTasksByListId", this.listProp.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp.id];
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
  max-height: 15rem;
  line-height: 1.5rem;
}
</style>
