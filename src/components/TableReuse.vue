<template>
  <tr>
    <td v-if="rowType === 'categoryList'">{{ data.id }}</td>
    <td v-if="rowType === 'categoryList'">{{ data.name }}</td>
    <td v-if="rowType === 'dashboard'">{{ keys + 1 }}</td>
    <td v-if="rowType === 'dashboard'">{{ data.title }}</td>
    <td v-if="rowType === 'dashboard'">
      <img :src="data.imgUrl" height="100" width="200" />
    </td>
    <td v-if="rowType === 'dashboard'">{{ data.content }}</td>
    <td v-if="rowType === 'dashboard'">
      <select
        v-if="userRole === 'Admin'"
        v-model="data.status"
        @change="changeStatusOnHome($event, data.id)"
        class="form-select"
        :style="slcStyle"
      >
        <option value="active" style="color: green">Active</option>
        <option value="inactive" style="color: yellow">Inactive</option>
        <option value="archived" style="color: red">Archived</option>
      </select>
      <btn v-else :btnType="btnStyle" :btnValue="data.status"></btn>
    </td>
    <td v-if="rowType === 'dashboard'">
      <btn
        v-if="userId === data.AuthorId || userRole === 'Admin'"
        @click="doEdit('edit', data.id)"
        :btnType="btnEdit"
        :btnValue="'Edit'"
      ></btn>
    </td>
    <td v-if="rowType === 'historyList'">{{ keys + 1 }}</td>
    <td v-if="rowType === 'historyList'">{{ data.name }}</td>
    <td v-if="rowType === 'historyList'">{{ data.description }}</td>
    <td v-if="rowType === 'historyList'">{{ data.updatedBy }}</td>
    <td v-if="rowType === 'historyList'">{{ data.createdAt }}</td>
  </tr>
</template>

<script>
import btn from "./ButtonReuse.vue";
import opt from "./OptionRender.vue";
export default {
  name: "tableReuse",
  data() {
    return {
      btnEdit: ["btn", "btn-outline-warning"],
      userId: +localStorage.getItem("id"),
      userRole: localStorage.getItem("role"),
      btnStyle: [],
      slcStyle: "",
      state: "",
    };
  },
  components: {
    btn,
    opt,
  },
  methods: {
    changeStatusOnHome(event, id) {
      this.$emit("fnChildChangeStatus", { status: event.target.value, id });
    },
    doEdit(type, id) {
      this.$emit("isEditOrAdd", { type: type, id: id });
    },
  },
  props: ["data", "rowType", "keys"],
  created() {
    if (this.data.status === "active") this.btnStyle = ["btn", "btn-success"];
    else if (this.data.status === "inactive")
      this.btnStyle = ["btn", "btn-warning"];
    else this.btnStyle = ["btn", "btn-danger"];

    if (this.data.status === "active")
      this.slcStyle = "background-color: green";
    else if (this.data.status === "inactive")
      this.slcStyle = "background-color: yellow";
    else this.slcStyle = "background-color: red";
  },
};
</script>

<style>
</style>