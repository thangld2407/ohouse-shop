<template>
  <div id="login">
    <div class="login-form">
      <div class="login-form__header">
        <span>Login</span>
        <div class="login-form__header-types-login">
          <button class="btn btn-manual-outline">
            <i class="fab fa-google"></i>
          </button>
          <button class="btn btn-manual-outline">
            <i class="fab fa-facebook"></i>
          </button>
          <button class="btn btn-manual-outline">
            <i class="fab fa-twitter"></i>
          </button>
        </div>
      </div>
      <div class="login-form__body">
        <!-- <div class="login-form__body-form">
          <b-form-input v-model="fullname" placeholder="Name"></b-form-input>
        </div> -->
        <div class="login-form__body-form">
          <b-form-input v-model="email" placeholder="Email"></b-form-input>
        </div>
        <div class="login-form__body-form">
          <b-form-input
            type="password"
            v-model="password"
            placeholder="Password"
          ></b-form-input>
        </div>
      </div>
      <div class="login-form__footer">
        <b-form-checkbox id="checkbox-1" name="checkbox-1">
          I accept the terms and use
        </b-form-checkbox>
        <div class="login-form__footer-action">
          <button
            class="btn btn-manual"
            :disabled="isProcessing"
            @click="handleLogin()"
          >
            <span :class="isProcessing ? 'd-none' : 'd-block'"> Login </span>
            <b-spinner small v-if="isProcessing"></b-spinner>
          </button>
        </div>
      </div>
      <router-link to="/register">Register</router-link>
      <div>
        <router-link to="/forgot-password">Forgot Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { MakeToast } from "../../utils/MakeToast";
import { login, register } from "../../api/module/auth";
export default {
  name: "Login",
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
      isProcessing: false,
      countErrors: 0,
      messgaeErrors: "",
      isErrorMessage: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isProcessing = true;
      let data = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await login(data);
        if (response.status_code === 200) {
          MakeToast({
            variant: "success",
            content: response.message,
            title: "Success",
          });
          localStorage.setItem('access_token', response.access_token);
          this.isProcessing = false;
          // this.$router.push("/");
        } else if (response.status_code === 401) {
          MakeToast({
            variant: "warning",
            content: response.message,
            title: "Warning",
          });
          this.isProcessing = false;
        } else {
          MakeToast({
            variant: "warning",
            content: response.message,
            title: "Warning",
          });
          this.isProcessing = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async handleRegister() {
      this.isProcessing = true;
      try {
        let data = {
          email: this.email,
          password: this.password,
          name: this.fullname,
        };
        const response = await register(data);
        this.resetData();
        this.isProcessing = false;
      } catch (error) {
        console.log(error);
      }
    },

    resetData() {
      this.email = "";
      this.password = "";
      this.fullname = "";
    },
  },
};
</script>
