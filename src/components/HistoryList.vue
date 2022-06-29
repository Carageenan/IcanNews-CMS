<template>
  <div id="historyList-childMain ">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Description</th>
          <th>Updated By</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tableReuse
          v-for="(history, i) in changeFormatDate"
          :key="i"
          :keys="i"
          :data="history"
          :rowType="'historyList'"
        ></tableReuse>
      </tbody>
    </table>
  </div>
</template>

<script>
import tableReuse from "./TableReuse.vue";
export default {
  name: "historyList",
  data() {
    return {};
  },
  props: ["changeFormatDate"],
  components: {
    tableReuse,
  },
  created() {
    this.$emit("getAllHistory");
  },
};
</script>

<style>
</style>