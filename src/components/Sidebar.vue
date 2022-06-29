<template>
  <div id="sidebar-childMain" class="col-lg-3 col-sm-5">
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style="width: 280px"
    >
      <a
        class="
          d-flex
          align-items-center
          mb-3 mb-md-0
          me-md-auto
          link-dark
          text-decoration-none
        "
      >
        <span class="fs-4">Hello, {{ name }} </span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a class="nav-link active text-center disabled" aria-current="page">
            Menu
          </a>
        </li>
        <br />
        <li class="d-grid gap-2">
          <button
            @click="changeDashboard('home')"
            class="btn btn-outline-secondary"
          >
            Dashboard
          </button>
        </li>
        <li class="d-grid gap-2">
          <button @click="doAddNews('add')" class="btn btn-outline-secondary">
            Create News
          </button>
        </li>
        <li class="d-grid gap-2">
          <button
            @click="changeDashboard('categories')"
            class="btn btn-outline-secondary"
          >
            Category
          </button>
        </li>
        <li class="d-grid gap-2">
          <button
            @click="changeDashboard('histories')"
            class="btn btn-outline-secondary"
          >
            History News
          </button>
        </li>
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="
            d-flex
            align-items-center
            link-dark
            text-decoration-none
            dropdown-toggle
          "
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://c.tenor.com/8eRElDLxf0oAAAAC/natsu-dragneel.gif"
            alt=""
            width="50"
            height="50"
            class="rounded-circle me-2"
          />
          <strong>Role: {{ role }}</strong>
        </a>
        <ul
          class="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a @click="logoutOnSidebar" class="dropdown-item" href="#"
              >Sign out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      name: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    };
  },
  methods: {
    changeDashboard(page) {
      this.$emit("changeDashboard", page);
    },
    logoutOnSidebar() {
      this.$emit("childLogout");
    },
    doAddNews(type) {
      this.$emit("isEditOrAdd", { type: type });
    },
  },
};
</script>

<style>
</style>