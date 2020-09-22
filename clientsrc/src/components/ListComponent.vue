<template>
  <div class="list-component col-md-4 my-3">
    <div class="card card-style m-2" style="height: 25rem">
      <div class="card-header" style="height: 5rem">
        <h5 class="card-title">{{ listProp.title }}</h5>
      </div>
      <div class="card-body shadow">
        <p class="card-text card-body-style">Tasks...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-component",
  props: ["listProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
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
