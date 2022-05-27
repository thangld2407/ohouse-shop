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
          <small v-if="isErrorMessage" class="float-left text-danger">{{
            messgaeErrors
          }}</small>
        </div>
        <div class="login-form__body-form">
          <b-form-input v-model="email" placeholder="Email"></b-form-input>
          <small v-if="isErrorMessage" class="float-left text-danger">{{
            messgaeErrors
          }}</small>
        </div>
        <div class="login-form__body-form">
          <b-form-input
            type="password"
            v-model="password"
            placeholder="Password"
          ></b-form-input>
          <small v-if="isErrorMessage" class="float-left text-danger">{{
            messgaeErrors
          }}</small>
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
      await this.validation(data);
      if (this.countErrors === Object.keys(data).length) {
        MakeToast({
          variant: "success",
          title: "Success",
          content: data.email,
        });
        setTimeout(() => {
        this.isErrorMessage = false;
          this.isProcessing = false;
        }, 2000);
      }
    },
    validation(data) {
      for (let obj in data) {
        if (data[obj] === "") {
          this.messgaeErrors = `You can not empty field ${obj}`;
          this.isErrorMessage = true;
          setTimeout(() => {
            this.isProcessing = false;
          }, 2000);
        } else {
          this.countErrors += 1;

        }
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
