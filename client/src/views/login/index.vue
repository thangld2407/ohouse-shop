<template>
  <div id="login">
    <div class="login-form">
      <div class="login-form__header">
        <span>Create Account</span>
        <div class="login-form__header-types-login">
          <button class="btn btn-outline-secondary">
            <i class="fab fa-google"></i>
          </button>
          <button class="btn btn-outline-secondary">
            <i class="fab fa-facebook"></i>
          </button>
          <button class="btn btn-outline-secondary">
            <i class="fab fa-twitter"></i>
          </button>
        </div>
      </div>
      <div class="login-form__body">
        <b-form-input v-model="fullname" placeholder="Name"></b-form-input>
        <b-form-input v-model="email" placeholder="Email"></b-form-input>
        <b-form-input v-model="password" placeholder="Password"></b-form-input>
      </div>
      <div class="login-form__footer">
        <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1">
          I accept the terms and use
        </b-form-checkbox>
        <div class="login-form__footer-action">
          <button class="btn btn-danger">Sign Up</button>
          <button class="btn btn-outline-danger">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProduct } from "../../api/module/product";
import { formatPrice } from "../../utils/formatPrice";
export default {
  name: "Login",
  data() {
    return {
      fullname: "username",
      products: [],
      formatPrice,
    };
  },
  methods: {
    async handleGetProduct() {
      try {
        const response = await getProduct();
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
