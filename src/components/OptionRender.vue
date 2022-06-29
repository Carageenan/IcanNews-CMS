<template>
  <div>
    <select
      v-model="selected"
      @change="getCategoryId($event)"
      class="form-select"
    >
      <option value="selected">Choose news category:</option>
      <option v-for="(category, i) in data" :key="i" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "opt",
  data() {
    return {
      selected: this.whichSelected(this.categoryId),
    };
  },
  methods: {
    whichSelected(data) {
      if (data) {
        return this.categoryId;
      } else {
        return "selected";
      }
    },
    getCategoryId(event) {
      this.$emit("getCategory", event.target.value);
    },
  },
  props: ["data", "optType", "categoryId"],
};
</script>

<style>
</style>