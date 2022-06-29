<template>
  <div id="register-page" class="d-flex justify-content-center py-5">
    <form @submit.prevent="register">
      <h1>Sign Up</h1>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          v-model="registerUsername"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="registerEmail"
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
        <label for="password" class="form-label"> Password</label>
        <input
          v-model="registerPassword"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
        />
        <div id="passwordHelp" class="form-text">
          Minimal password character is 5 to 20 character's.
        </div>
      </div>
      <div class="mb-3">
        <label for="phoneNumber" class="form-label">Phone Number</label>
        <input
          v-model="registerPhoneNumber"
          type="text"
          class="form-control"
          id="phoneNumber"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input
          v-model="registerAddress"
          type="text"
          class="form-control"
          id="address"
          aria-describedby="emailHelp"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "registerPage",
  data() {
    return {
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerPhoneNumber: "",
      registerAddress: "",
    };
  },
  methods: {
    register() {
      this.$emit("childDoRegister", {
        registerUsername: this.registerUsername,
        registerEmail: this.registerEmail,
        registerPassword: this.registerPassword,
        registerPhoneNumber: this.registerPhoneNumber,
        registerAddress: this.registerAddress,
      });
    },
  },
};
</script>

<style>
</style>