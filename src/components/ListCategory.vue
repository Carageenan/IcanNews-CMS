<template>
  <div id="categoryList-childMain ">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tableReuse
          v-for="(category, i) in childDataCategory"
          :key="i"
          :data="category"
          :rowType="'categoryList'"
        ></tableReuse>
      </tbody>
    </table>
  </div>
</template>

<script>
import tableReuse from "./TableReuse.vue";
export default {
  name: "listCategory",
  data() {
    return {};
  },
  components: {
    tableReuse,
  },
  props: ["childDataCategory"],
  created() {
    this.$emit("showAllCategory");
  },
};
</script>

<style>
</style>