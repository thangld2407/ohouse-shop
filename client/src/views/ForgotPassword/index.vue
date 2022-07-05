<template>
  <div
    class="forgot-password d-flex align-items-center justify-content-center flex-column"
  >
    <b-form-group id="input-group-2" label-for="input-2">
      <b-form-input
        id="input-2"
        placeholder="Enter your email"
        required
        v-model="user.email"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-2" label-for="input-2">
      <b-form-input
        id="input-2"
        placeholder="Enter new password"
        required
        v-model="user.password"
      ></b-form-input>
    </b-form-group>
    <button @click="handleForgotPassword()" class="btn btn-manual">
      Forgot Password
    </button>
  </div>
</template>

<script>
import { forgotPassword } from "../../api/module/auth";
import { MakeToast } from "../../utils/MakeToast";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleForgotPassword() {
      const data = {
        email: this.user.email,
        new_password: this.user.password,
      };
      forgotPassword(data)
        .then((res) => {
          if (res.status_code === 200) {
            return MakeToast({
              variant: "success",
              content: res.message,
              title: "Success",
            });
          }else {
            return MakeToast({
              variant: "warning",
              content: res.message,
              title: "Error",
            });
          }
        })
        .catch((err) => {
          MakeToast({
            variant: "danger",
            content: "Server is not response" + err.message,
            title: "Forgot Password",
          });
        });
    },
  },
};
</script>

<style></style>
