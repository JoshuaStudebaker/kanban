<template>
  <li>{{commentProp.title}}</li>
</template>

<script>
export default {
  name: "comment-component",
  props: ["commentProp"],
};
</script>

<style scoped>
</style>
