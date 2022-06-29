<template>
  <div id="createNews-page" class="d-flex justify-content-center py-5">
    <form @submit.prevent="createNewsHere()">
      <h1>Create News</h1>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input v-model="title" type="text" class="form-control" id="title" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <input
          v-model="content"
          type="text"
          class="form-control"
          id="content"
        />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input v-model="imgUrl" type="text" class="form-control" id="image" />
      </div>
      <div class="mb-3">
        <label for="category">Category</label>
        <opt
          @getCategory="getCategory"
          :data="childDataCategory"
          :categoryId="categoryId"
        >
        </opt>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import opt from "./OptionRender.vue";
export default {
  name: "reusableForm",
  data() {
    return {
      title: "",
      content: "",
      imgUrl: "",
      categoryId: "",
      isEdit: this.isEditOrAdd(this.editInfo),
      newsId: this.ifEdit(this.isEdit),
    };
  },
  methods: {
    createNewsHere() {
      if (!this.isEdit) {
        this.$emit("childAddNews", {
          title: this.title,
          content: this.content,
          imgUrl: this.imgUrl,
          categoryId: this.categoryId,
        });
      } else {
        this.$emit("doEdit", {
          title: this.title,
          content: this.content,
          imgUrl: this.imgUrl,
          CategoryId: this.categoryId,
          newsId: this.newsId,
        });
      }
    },
    getCategory(data) {
      this.categoryId = data;
    },
    isEditOrAdd(obj) {
      if (obj.type === "edit") {
        return true;
      } else {
        return false;
      }
    },
    ifEdit(isEdit) {
      if (this.isEdit) {
        this.newsId = editInfo.data.id;
      }
    },
  },
  components: {
    opt,
  },
  props: ["childDataCategory", "editInfo"],
  created() {
    this.$emit("generateFormAddNews");
    if (this.isEdit === true) {
      this.title = this.editInfo.data.title;
      this.content = this.editInfo.data.content;
      this.imgUrl = this.editInfo.data.imgUrl;
      this.categoryId = this.editInfo.data.CategoryId;
    }
  },
};
</script>

<style>
</style>