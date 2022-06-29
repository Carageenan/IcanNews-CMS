<template>
  <nav
    id="navbar"
    class="navbar navbar-expand-lg navbar-dark"
    style="
      background-image: url('https://cdn3.f-cdn.com/contestentries/1489974/18545046/5cba2aba229c4_thumb900.jpg');
    "
  >
    <div class="container-fluid">
      <div>
        <img
          style="width: 100px"
          src="https://myremovebg.com//static/results/1646668780275730.png"
          alt=""
        />
        <a @click="navbarChangePage" type="button" class="navbar-brand"
          >ICAN NEWS</a
        >
      </div>
      <div
        class="collapse navbar-collapse d-flex justify-content-between"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="me-5 text-center">
          <h4 style="color: antiquewhite">Akurat</h4>
          <h4 style="color: antiquewhite">&</h4>
          <h4 style="color: antiquewhite">Terpercaya</h4>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      page: "",
    };
  },
  methods: {
    navbarChangePage() {
      if (!localStorage.getItem("access_token")) {
        this.page = "login";
      } else {
        this.page = "loggedIn";
      }
      this.$emit("navbarChangeRegis", this.page);
    },
  },
  name: "NavbarSection",
};
</script>

<style></style>
