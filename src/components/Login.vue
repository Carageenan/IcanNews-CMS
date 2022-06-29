<template>
  <div
    id="login-page"
    class="d-flex flex-column align-items-center justify-content-center py-5"
  >
    <form @submit.prevent="login">
      <h1>Welcome to Ican News CMS</h1>
      <br />
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          v-model="loginEmail"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="loginPassword"
          type="password"
          class="form-control"
          id="password"
        />
        <div class="form-text">
          Don't have any accout yet? You can sign up first
          <a @click="changeToRegis" type="button" style="color: blue"
            >Sign up</a
          >
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <br />
      <br />
      <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
    </form>
    <div class="form text">Or you can login by:</div>
    <button @click="loginGoogle" class="btn" style="font-size: 20px">
      <i class="fab fa-google"></i> mail
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "",
      loginEmail: "",
      loginPassword: "",
    };
  },
  methods: {
    changeToRegis() {
      this.page = "register";
      this.$emit("changeRegis", this.page);
    },
    login() {
      this.page = "loggedIn";
      this.$emit("childDoLogin", {
        loginEmail: this.loginEmail,
        loginPassword: this.loginPassword,
        page: this.page,
      });
    },
    loginGoogle() {
      this.$emit("doLoginGoogle");
    },
  },
  name: "loginSection",
};
</script>

<style>
</style>