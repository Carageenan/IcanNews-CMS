<template>
  <div id="tableList-childMain ">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Image</th>
          <th>Content</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tableReuse
          v-for="(news, i) in childAllDataNews"
          :key="news.id"
          @isEditOrAdd="isEditOrAdd"
          @fnChildChangeStatus="fnChildChangeStatus"
          :keys="i"
          :data="news"
          :rowType="'dashboard'"
        ></tableReuse>
      </tbody>
    </table>
  </div>
</template>
 
<script>
import tableReuse from "./TableReuse.vue";
export default {
  name: "dataHome",
  data() {
    return {};
  },
  components: {
    tableReuse,
  },
  props: ["childAllDataNews", "fnChildChangeStatus", "isEditOrAdd"],
  created() {
    this.$emit("childShowAllNews");
  },
};
</script>
  
<style>
</style>