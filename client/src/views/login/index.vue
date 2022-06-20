<template>
  <div id="login">
    <div class="login-form">
      <div class="login-form__header">
        <span>Create Account</span>
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
        <div class="login-form__body-form">
          <b-form-input v-model="fullname" placeholder="Name"></b-form-input>
        </div>
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
            @click="handleRegister()"
          >
            Sign Up
            <b-spinner small v-if="isProcessing"></b-spinner>
          </button>
          <button class="btn btn-manual-outline">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MakeToast } from "../../utils/MakeToast";
import { register } from "../../api/module/auth";
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
        fullname: this.fullname,
      };

      console.log(data);
    },
    async handleRegister() {
      this.isProcessing = true;
      try {
        let data = {
          email: this.email,
          password: this.password,
          name: this.fullname,
        };
        register(data);
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
